import {
    Bot,
    Cloud,
    Database,
    GitBranch,
    KeyRound,
    Lock,
    Monitor,
    Network,
    Radar,
    ScrollText,
    Search,
    Server,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
    Users,
    Zap,
} from "lucide-react";

import type { IconCard } from "@/components/sections/IconCardGrid";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { RichText } from "@/lib/rich-text";

export const meta = {
    titleLead: "AI PAM Solutions for",
    titleAccent: "Secure Human, Machine & Automated Access",
};

/* ──────────────────────────────────────────────
   Hero
────────────────────────────────────────────── */

export const hero = {
    intro: [
        "AI, automation, cloud workloads, applications, and machine identities are changing how privileged access operates inside the enterprise. Security teams now need to protect more than traditional administrator accounts—they need visibility and control wherever elevated access is used.",
    ] as RichText,
    body: [
        "OmniPriv brings ",
        { text: "Privileged Access Management", href: "https://omnipriv.com/platform" },
        " into this new environment with centralized identity verification, least-privilege authorization, Just-in-Time access, credential protection, session monitoring, and intelligent threat detection. Our AI PAM solutions help organizations secure privileged access across human users, service accounts, machine identities, automated workflows, and AI-enabled systems without introducing unnecessary operational friction.",
    ] as RichText,
    primary: { href: "/demo", label: "Secure Your Privileged Access" },
    secondary: { href: "/demo", label: "Request a Demo" },
    image: {
        src: "/identities/ai-automated-identities.jpeg",
        alt: "AI agent and machine identity privileged access governance visualization",
    },
};

/* ──────────────────────────────────────────────
   Privileged Access Has Changed in the AI Era
────────────────────────────────────────────── */

export const changedEraSection = {
    title: "Privileged Access Has Changed in the AI Era",
    lead: [
        "Traditional PAM was largely designed around administrators logging into servers with powerful credentials. That model is no longer enough.",
    ] as RichText,
    prompt: "Modern enterprises now depend on:",
    dependencies: [
        "Human administrators and developers",
        "Vendors and third-party users",
        "Service accounts",
        "APIs and applications",
        "Cloud workloads",
        "CI/CD pipelines",
        "Machine identities",
        "Automated workflows",
        "AI-enabled applications and agents",
    ],
    body: [
        "Each can interact with sensitive infrastructure, credentials, data, or privileged functions.",
    ] as RichText,
    zeroTrustBody: [
        "This is where AI privileged access management becomes important. Rather than creating permanent trust around an identity, OmniPriv applies Zero Trust principles so privileged access can be verified, restricted, monitored, and audited throughout its lifecycle. OmniPriv currently supports identity integrations, service-account management, workload identities, dynamic secrets, and short-lived credentials across ",
        { text: "cloud and DevOps environments", href: "https://omnipriv.com/integrations" },
        ".",
    ] as RichText,
};

/* ──────────────────────────────────────────────
   One Privileged Access Layer for Every Identity
────────────────────────────────────────────── */

export const identityLayersSection = {
    title: "One Privileged Access Layer for Every Identity",
    lead: [
        "Unified privileged security across people, non-human infrastructure, and autonomous AI workloads.",
    ] as RichText,
    human: {
        icon: Users,
        title: "Human Identities",
        lead: [
            "Administrators, employees, developers, contractors, and vendors often require powerful access to critical systems.",
        ] as RichText,
        body: [
            "OmniPriv verifies identities, enforces MFA and RBAC, applies approval workflows, and provides time-limited access based on policy. This helps users complete legitimate work without maintaining unnecessary permanent privileges.",
        ] as RichText,
        prompt: "Protect human privileged access with:",
        controls: [
            "Multi-factor authentication (MFA)",
            "Role-Based Access Control (RBAC)",
            "Conditional access policies",
            "Approval workflows",
            "Time-limited privileges",
            "Session recording and auditing",
        ],
    },
    machine: {
        icon: Server,
        title: "Machine & Non-Human Identities",
        lead: [
            "Applications and infrastructure increasingly authenticate without human involvement.",
        ] as RichText,
        body: [
            "Effective machine identity security must account for service accounts, workloads, APIs, SSH keys, tokens, and cloud roles that may hold sensitive privileges. OmniPriv supports service-account management, workload identities, cloud IAM integrations, dynamic secrets, API-key rotation, and short-lived DevOps credentials—helping organizations strengthen non-human identity security without relying on unmanaged long-lived secrets.",
        ] as RichText,
        link: {
            href: "/solutions/machine-identity-security",
            label: "Explore Machine Identity Security",
        },
    },
    ai: {
        icon: Bot,
        title: "AI & Automated Identities",
        lead: [
            "AI-enabled systems and automated processes may need access to databases, applications, infrastructure, APIs, or protected credentials to complete tasks.",
        ] as RichText,
        body: [
            "A strong AI identity security strategy should avoid giving automation broad, permanent administrative access simply because it needs occasional privileged capabilities. OmniPriv can place privileged resources behind policy-controlled access, temporary privileges, credential protection, monitoring, and audit controls. This helps organizations secure AI agents and AI-enabled workflows at the privileged-access layer while maintaining accountability around sensitive resources.",
        ] as RichText,
        link: {
            href: "/solutions/ai-agent-security",
            label: "Explore AI Agent Security",
        },
    },
};

/* ──────────────────────────────────────────────
   How OmniPriv Strengthens AI-Driven Privileged Access
────────────────────────────────────────────── */

export const strengthenSection = {
    title: "How OmniPriv Strengthens AI-Driven Privileged Access",
    lead: [
        "Core capabilities designed to govern elevated machine and AI permissions without introducing operational bottlenecks.",
    ] as RichText,
    jit: {
        step: "01",
        title: "Replace Permanent Access with Just-in-Time Privileges",
        lead: [
            "Persistent administrative permissions create an unnecessary window of exposure.",
        ] as RichText,
        body: [
            "OmniPriv's JIT model grants task-specific, time-limited privileged access and automatically removes it when the approved window expires. Approval workflows can also be integrated with existing ",
            { text: "ITSM processes", href: "https://omnipriv.com/blog/jit-access-guide" },
            ". For organizations considering just-in-time access for AI agents, the same core principle applies: privileged access should exist only when a legitimate workflow requires it.",
        ] as RichText,
        calloutTitle: "Move Toward Zero Standing Privileges",
        calloutBody: [
            "Zero Standing Privileges reduces persistent administrative rights by making privileged access temporary rather than permanently assigned. This reduces the number of identities that remain powerful when they are not actively performing authorized work.",
        ] as RichText,
    },
    credentials: {
        step: "02",
        title: "Protect Credentials from Human and Automated Exposure",
        lead: [
            "AI-powered workflows should not require passwords, SSH keys, API tokens, or sensitive secrets to be embedded in scripts or exposed to end users.",
        ] as RichText,
        body: [
            "OmniPriv centralizes privileged credential management and supports automated rotation of passwords, SSH keys, and API tokens. Cloud and DevOps integrations can also provide dynamic or short-lived credentials rather than hardcoded secrets via the ",
            { text: "OmniPriv Platform", href: "https://omnipriv.com/" },
            ". This creates a stronger foundation for AI credential security while reducing dependence on long-lived authentication material.",
        ] as RichText,
        chips: [
            "Automated Password Rotation",
            "SSH Key Governance",
            "API Token Cycling",
            "Dynamic Cloud Secrets",
            "Short-Lived DevOps Tokens",
            "Zero Hardcoded Credentials",
        ],
    },
    accessControl: {
        step: "03",
        title: "Apply Policy-Based AI Agent Access Control",
        lead: [
            "Not every identity should be able to access every privileged resource.",
        ] as RichText,
        body: [
            "AI agent access control should follow the same security fundamentals applied to highly privileged human users:",
        ] as RichText,
        flow: [
            "Verify Identity",
            "Evaluate Policy",
            "Grant Required Access",
            "Monitor Activity",
            "Revoke When Finished",
        ],
        note: [
            "OmniPriv provides RBAC, conditional access, time-based restrictions, command-level controls, and approval workflows to govern privileged requests. This allows organizations developing a PAM AI strategy to keep privileged authorization centralized rather than embedding unrestricted privileges into individual applications or workflows.",
        ] as RichText,
    },
    sessionMonitoring: {
        step: "04",
        title: "Control Activity During Privileged Sessions",
        lead: [
            "Authorization should not stop once access begins.",
        ] as RichText,
        body: [
            "OmniPriv provides ",
            { text: "privileged session monitoring", href: "https://omnipriv.com/platform/secure-remote-access" },
            " across SSH, RDP, VNC, HTTP, and database connections, with recording, isolation, searchable session history, script monitoring, session controls, and real-time intervention. For governed sessions, runtime access control can restrict specific actions and trigger responses when predefined security conditions are detected.",
        ] as RichText,
        prompt: "Security teams gain visibility into:",
        visibilityItems: [
            "Who initiated privileged access",
            "Which system was accessed",
            "What actions were performed",
            "When activity occurred",
            "Whether suspicious behavior appeared",
            "What happened during the entire session",
        ],
    },
    behavioralAnalysis: {
        step: "05",
        title: "Detect Risk with Intelligent Behavioral Analysis",
        lead: [
            "AI can also strengthen PAM operations.",
        ] as RichText,
        body: [
            "OmniPriv uses machine-learning-based behavioral analysis to identify unusual command patterns, abnormal access times, and unexpected data volumes. Security teams can receive alerts and terminate suspicious sessions when required through OmniPriv's ",
            { text: "security intelligence engine", href: "https://omnipriv.com/security" },
            ". This intelligence helps AI PAM solutions move beyond static permissions toward more context-aware privileged security.",
        ] as RichText,
    },
};

/* ──────────────────────────────────────────────
   Designed for Agentic AI Security Without Losing Control
────────────────────────────────────────────── */

export const agenticSection = {
    title: "Designed for Agentic AI Security Without Losing Control",
    lead: [
        "As enterprises experiment with autonomous systems, agentic AI security creates a new question: What happens when software can initiate actions that previously required a human administrator?",
    ] as RichText,
    body: [
        "The answer should not be unrestricted machine privilege. Organizations need clear identity, scoped permissions, secure credentials, temporary elevation, monitoring, and traceability around privileged resources. OmniPriv brings these established PAM controls into modern AI-enabled environments so organizations can introduce automation while keeping sensitive infrastructure behind governed access.",
    ] as RichText,
    image: {
        src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=70",
        alt: "Agentic AI security with governed access controls",
    },
};

/* ──────────────────────────────────────────────
   AI PAM Across Your Enterprise Environment
────────────────────────────────────────────── */

export const environmentSection = {
    title: "AI PAM Across Your Enterprise Environment",
    lead: [
        "Seamless privileged protection deployed across cloud, pipelines, databases, and hybrid infrastructure.",
    ] as RichText,
    environments: [
        {
            icon: Cloud,
            title: "Cloud & Multi-Cloud",
            text: "Control privileged access across AWS, Azure, GCP, Kubernetes, cloud IAM roles, vaults, and workload identities from a centralized security model.",
            link: { href: "https://omnipriv.com/integrations", label: "Cloud Integrations" },
        },
        {
            icon: GitBranch,
            title: "DevOps & Automation",
            text: "Reduce hardcoded credentials in CI/CD pipelines with short-lived tokens, vault integrations, dynamic secrets, and controlled privileged access for deployment workflows.",
            link: { href: "https://omnipriv.com/integrations", label: "DevOps Connectors" },
        },
        {
            icon: Database,
            title: "Databases",
            text: "Secure access to production databases with credential rotation, session recording, query auditing, and policy-based controls.",
            link: { href: "https://omnipriv.com/integrations", label: "Database Security" },
        },
        {
            icon: Network,
            title: "Hybrid Infrastructure",
            text: "Bring cloud, on-premises, databases, applications, and infrastructure under a unified Privileged Access Management approach instead of maintaining isolated access controls.",
            link: { href: "/platform/infrastructure-deployment", label: "Infrastructure Deployment" },
        },
    ],
};

/* ──────────────────────────────────────────────
   Why Choose OmniPriv for AI-Ready PAM?
────────────────────────────────────────────── */

export const whyChooseSection = {
    title: "Why Choose OmniPriv for AI-Ready PAM?",
    lead: [
        "Modern AI PAM solutions should strengthen existing enterprise security rather than create another isolated identity layer.",
    ] as RichText,
    body: [
        "OmniPriv provides one PAM platform for controlling privileged access across people, infrastructure, workloads, and automation. OmniPriv's platform currently organizes these functions across eight core PAM capabilities spanning credential management, identity integration, session management, workflow controls, audit/compliance, and threat detection.",
    ] as RichText,
};

export const capabilities: IconCard[] = [
    {
        icon: Search,
        title: "Discover",
        text: "Identify privileged accounts, systems, assets, and access relationships.",
    },
    {
        icon: ShieldCheck,
        title: "Verify",
        text: "Authenticate identities and enforce MFA before privileged access begins.",
    },
    {
        icon: SlidersHorizontal,
        title: "Control",
        text: "Apply least privilege, RBAC, approvals, JIT access, and conditional policies.",
    },
    {
        icon: KeyRound,
        title: "Protect",
        text: "Secure passwords, SSH keys, API tokens, service accounts, and other privileged credentials.",
    },
    {
        icon: Monitor,
        title: "Monitor",
        text: "Record and observe privileged sessions while detecting unusual behavior.",
    },
    {
        icon: Zap,
        title: "Respond",
        text: "Alert security teams and intervene when suspicious privileged activity occurs.",
    },
    {
        icon: ScrollText,
        title: "Audit",
        text: "Maintain searchable, accountable records of privileged actions for investigations and compliance.",
    },
];

/* ──────────────────────────────────────────────
   Build an AI-Ready Privileged Access Strategy
────────────────────────────────────────────── */

export const closing = {
    title: "Build an AI-Ready Privileged Access Strategy",
    body: [
        "AI may change who—or what—requests access, but the security principle remains the same: No identity should receive more privilege than it needs, for longer than it needs it. OmniPriv combines Zero Trust Privileged Access Management, JIT access, credential protection, machine identity controls, intelligent monitoring, and auditable sessions to help organizations protect critical infrastructure as human and automated access continues to evolve.",
    ],
    primary: { href: "/demo", label: "Request an OmniPriv Demo" },
    secondary: { href: "/platform", label: "Explore the PAM Platform" },
};

/* ──────────────────────────────────────────────
   Frequently Asked Questions
────────────────────────────────────────────── */

export const faqSection = {
    title: "Frequently Asked Questions",
    subtitle:
        "Everything you need to know about AI PAM solutions, machine identity security, and automated privileged access.",
};

export const faqs: FaqEntry[] = [
    {
        question: "What are AI PAM solutions?",
        answer: "AI PAM solutions apply privileged-access security principles to environments where people, applications, machines, automation, and AI-enabled systems may need elevated access. Core controls can include identity verification, least privilege, JIT access, credential security, session monitoring, threat detection, and auditing.",
    },
    {
        question: "What is AI privileged access management?",
        answer: "AI privileged access management extends traditional PAM practices to the privileged resources used by automated and AI-enabled identities. The goal is to prevent permanent, uncontrolled access to sensitive systems while preserving the access required for approved operations.",
    },
    {
        question: "How does PAM help secure AI agents?",
        answer: "PAM can help secure AI agents by placing privileged infrastructure behind controlled access policies, protecting credentials, limiting privilege duration, and monitoring privileged activity. The precise security model should depend on how an organization's AI systems interact with its infrastructure.",
    },
    {
        question: "What is the difference between AI identity security and machine identity security?",
        answer: "AI identity security focuses on identities associated with AI-enabled systems and autonomous workflows. Machine identity security covers the broader category of non-human identities, including workloads, services, applications, APIs, certificates, and service accounts. In practice, the two areas increasingly overlap.",
    },
    {
        question: "Why is JIT important for automated access?",
        answer: "JIT reduces persistent access. Instead of maintaining permanent administrative permissions, an approved identity receives the required privilege for a limited period. This supports least privilege and reduces exposure associated with standing permissions.",
    },
    {
        question: "Can OmniPriv monitor privileged sessions?",
        answer: "Yes. OmniPriv provides session recording, session isolation, searchable histories, script monitoring, session controls, and real-time intervention across multiple privileged-access protocols.",
    },
];
