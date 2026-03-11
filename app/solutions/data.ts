import {
    Server, Key, Shield, Building2, Monitor,
    Workflow, BarChart3, AlertTriangle,
    // Feature icons
    Globe, Database, Cpu, Eye, Lock, RefreshCw,
    FileSearch, Layers, Zap, Clock, Network,
    Fingerprint, UserCheck, CheckCircle2,
    type LucideIcon,
} from "lucide-react";

export interface SolutionFeature {
    name: string;
    description: string;
    icon: LucideIcon;
}

export interface Solution {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    icon: LucideIcon;
    features: SolutionFeature[];
}

export const solutions: Solution[] = [
    // ─── 1. Infrastructure & Deployment ───────────────────────────
    {
        slug: "infrastructure-deployment",
        title: "Infrastructure & Deployment",
        tagline: "Flexible on-premise deployment across any enterprise environment",
        description:
            "OmniPriv deploys on-premise across VMware, Red Hat, and OpenStack platforms with no software agents required on any device, server, or endpoint. It operates through both CLI and web interfaces and runs on all modern browsers.",
        metaTitle: "Infrastructure & Deployment — OmniPriv PAM",
        metaDescription:
            "Deploy OmniPriv on-premise across VMware, Red Hat, and OpenStack with agentless architecture, high availability, and granular disaster recovery.",
        icon: Server,
        features: [
            { name: "On-Premise Deployment", description: "Supports VMware, Red Hat, and OpenStack-based infrastructure installations", icon: Server },
            { name: "Agentless Architecture", description: "No agents installed on devices or user workstations — zero additional operational complexity", icon: Zap },
            { name: "Browser-Based GUI", description: "Fully functional on Edge, Chrome, Firefox, and Safari", icon: Globe },
            { name: "CLI & Web Interface", description: "Full platform control via both command-line and browser-based interfaces", icon: Monitor },
            { name: "Unified Administration", description: "Centralized management console with a single UI and central repository", icon: Layers },
            { name: "Software Appliance", description: "Delivered as a software-based appliance for streamlined deployment", icon: Cpu },
            { name: "High Availability", description: "Multi-container architecture with database replication, load balancing, and auto-restart health checks — no single point of failure", icon: RefreshCw },
            { name: "Distributed Architecture", description: "Zone and Gateway model routes all remote access through SSH proxies managed from one control plane", icon: Network },
            { name: "Multi-Tenancy", description: "Strict tenant isolation via org_id on every resource, with per-organization RBAC", icon: Building2 },
            { name: "Secondary Security Layer", description: "Secondary Security Password required for Vault access", icon: Lock },
            { name: "Break-Glass Access", description: "Emergency bypass procedure to access credentials outside normal PAM flow", icon: Key },
            { name: "Granular Disaster Recovery", description: "Granular backup and restore to minimize downtime without full system restoration", icon: Database },
        ],
    },

    // ─── 2. Password & Credential Management ──────────────────────
    {
        slug: "password-credential-management",
        title: "Password & Credential Management",
        tagline: "Automated credential lifecycle management at enterprise scale",
        description:
            "OmniPriv automates the full lifecycle of privileged credentials — from rotation and validation to SSH key management and bulk onboarding — ensuring every secret stays secure, synchronized, and auditable.",
        metaTitle: "Password & Credential Management — OmniPriv PAM",
        metaDescription:
            "Automate credential rotation, SSH key management, password reconciliation, and bulk onboarding with OmniPriv's enterprise credential vault.",
        icon: Key,
        features: [
            { name: "Offline Device Credentials", description: "Manages credentials for devices not regularly connected to the corporate network", icon: Globe },
            { name: "Automated Credential Rotation", description: "Policy-driven rotation with configurable recurrence, interval, and scheduled start time", icon: RefreshCw },
            { name: "SSH Key Management", description: "Stores, rotates, and pushes SSH key pairs via Change Secret automation; private keys never leave the vault", icon: Key },
            { name: "One-Time Password Enforcement", description: "Enforces single-use passwords with automatic rotation after each session", icon: Lock },
            { name: "Credential Validation", description: "Verify Account Secrets automation actively tests stored credentials against live assets", icon: CheckCircle2 },
            { name: "De-sync Resolution", description: "Detects credential mismatches and automatically pushes corrected passwords to assets", icon: Zap },
            { name: "Password Reconciliation", description: "Scheduled reconciliation plans reconnect and update lost or out-of-sync credentials without external utilities", icon: RefreshCw },
            { name: "Password Groups", description: "Accounts within a group automatically share the same password value; updates propagate to all linked members", icon: Layers },
            { name: "Password History", description: "Versioned credential history accessible to authorized users for a defined retention period", icon: Clock },
            { name: "Bulk Onboarding", description: "Mass enrollment of privileged entities with standardized accounts, rights, and permissions", icon: Database },
            { name: "Mobile Vault Access", description: "Built-in mobile client with TOTP, approval workflows, geofencing, and role-based vault access — no app install required", icon: Monitor },
        ],
    },

    // ─── 3. Application Security & Encryption ─────────────────────
    {
        slug: "application-security",
        title: "Application Security & Encryption",
        tagline: "Zero-trust credential protection with enterprise-grade encryption",
        description:
            "OmniPriv enforces multi-factor authentication, full encryption in transit and at rest, HSM integration, and AI-driven behavioral anomaly detection to protect every layer of privileged access.",
        metaTitle: "Application Security & Encryption — OmniPriv PAM",
        metaDescription:
            "Protect privileged access with MFA, AES/SHA encryption, HSM integration, tamper-proof audit storage, and AI-powered anomaly detection.",
        icon: Shield,
        features: [
            { name: "Multi-Factor Authentication", description: "Supports biometric, TOTP, hardware tokens, SMS OTP, email OTP, and push notification MFA", icon: Fingerprint },
            { name: "HSM Integration", description: "Credential protection backed by Hardware Security Module support", icon: Cpu },
            { name: "End-to-End Encryption", description: "All inter-component communication is encrypted with no plaintext transmission", icon: Lock },
            { name: "Encrypted Backups", description: "Fully encrypted backups with independent key management", icon: Database },
            { name: "Role Isolation", description: "Administrators cannot access credentials or sessions outside their defined role", icon: UserCheck },
            { name: "Tamper-Proof Audit Storage", description: "Audit records are stored in secure, tamper-resistant storage", icon: Shield },
            { name: "No Hard-Coded Credentials", description: "Platform contains zero hard-coded secrets; all credentials are vault-managed", icon: Key },
            { name: "AES + SHA Encryption", description: "All sensitive data encrypted at rest and in transit using SHA-256 and SHA-512", icon: Lock },
            { name: "Adaptive MFA with AI Anomaly Detection", description: "Keystroke dynamics engine analyzes typing rhythm and patterns; triggers MFA challenge on behavioral deviation even when credentials are correct", icon: AlertTriangle },
            { name: "Independent Key Backup", description: "SECRET_KEY is generated at install and must be stored externally — separate from the platform — to ensure data continuity across upgrades and recovery", icon: Key },
        ],
    },

    // ─── 4. Enterprise & Identity Integration ─────────────────────
    {
        slug: "enterprise-integration",
        title: "Enterprise & Identity Integration",
        tagline: "Seamless integration with your existing enterprise ecosystem",
        description:
            "OmniPriv connects natively with ticketing systems, SIEM platforms, identity management solutions, and LDAP/AD directories to ensure privileged access fits into your broader security and operations workflow.",
        metaTitle: "Enterprise & Identity Integration — OmniPriv PAM",
        metaDescription:
            "Integrate PAM with ticketing, SIEM, identity management, and LDAP/AD for unified privileged access governance across your enterprise.",
        icon: Building2,
        features: [
            { name: "Ticketing System Integration", description: "Built-in support for 6 ticket types with configurable multi-level approval workflows and automated notifications", icon: FileSearch },
            { name: "Pre-Access Ticket Verification", description: "Real-time ticket status check before any privileged credential is released — rejected or closed tickets block access automatically", icon: CheckCircle2 },
            { name: "Automatic Ticket Creation", description: "A ticket and approval workflow are triggered automatically on every password retrieval request", icon: Workflow },
            { name: "SIEM Integration", description: "Forwards privileged access events to SIEM platforms in real time for centralized security monitoring", icon: Network },
            { name: "Identity Management Integration", description: "Connects with enterprise Identity Management systems for user lifecycle and provisioning", icon: UserCheck },
            { name: "LDAP / Active Directory", description: "Bidirectional sync with LDAP/AD for user entitlement management and group-based access control", icon: Globe },
        ],
    },

    // ─── 5. Privileged Session Management ─────────────────────────
    {
        slug: "session-management",
        title: "Privileged Session Management",
        tagline: "Complete visibility and control over every privileged session",
        description:
            "OmniPriv records, isolates, and monitors all privileged sessions across platforms — giving security teams searchable audit trails, real-time intervention capabilities, and protection against credential exposure.",
        metaTitle: "Privileged Session Management — OmniPriv PAM",
        metaDescription:
            "Record, isolate, and monitor privileged sessions across SSH, RDP, VNC, HTTP, and databases with searchable audit trails and real-time controls.",
        icon: Monitor,
        features: [
            { name: "Session Recording", description: "Full video-fidelity recording of all privileged sessions stored securely with controlled playback", icon: Eye },
            { name: "Session Isolation", description: "Air-gap between target systems and the user's workstation — credentials never reach the endpoint", icon: Shield },
            { name: "Multi-Platform Support", description: "Session recording and isolation across SSH, RDP, VNC, HTTP, and database protocols", icon: Globe },
            { name: "Concurrent Session Scaling", description: "Supports high volumes of simultaneous sessions without additional licenses or hardware", icon: Layers },
            { name: "Searchable Session History", description: "Contextual, indexed session recordings fully searchable after the fact", icon: FileSearch },
            { name: "Session Controls", description: "Restrict specific user actions and trigger automated responses to session events", icon: Lock },
            { name: "Script Monitoring", description: "Every script executed during a session is logged and audited", icon: FileSearch },
            { name: "Native Client Support", description: "Administrators can use their preferred tools and clients without workflow disruption", icon: Monitor },
            { name: "HTTP Session Monitoring", description: "Granular HTTP request-level logging beyond simple screen capture", icon: Network },
            { name: "Database Query Controls", description: "Query blacklist/whitelist and dynamic data masking for native DB client connections — no jump server or extra hardware required", icon: Database },
        ],
    },

    // ─── 6. Workflow & Access Control ─────────────────────────────
    {
        slug: "workflow-access-control",
        title: "Workflow & Access Control",
        tagline: "Structured, policy-driven privileged access with full approval governance",
        description:
            "OmniPriv enforces approval-based access workflows, temporary privilege assignment, and application credential automation — ensuring every privileged action is authorized, time-bounded, and traceable.",
        metaTitle: "Workflow & Access Control — OmniPriv PAM",
        metaDescription:
            "Enforce 4-eyes approval, multi-level workflows, time-based policies, and application credential management for complete privileged access governance.",
        icon: Workflow,
        features: [
            { name: "4-Eyes Approval Principle", description: "Minimum two independent approvers required; no self-approval permitted", icon: UserCheck },
            { name: "Mobile & Email Approvals", description: "Approvers act via web GUI, mobile client, or email link — no login required for email approvals", icon: Monitor },
            { name: "Multi-Level Workflows", description: "Configurable approval chains with multiple approvers per step and sequential level completion", icon: Layers },
            { name: "Time-Based Policies", description: "Workflow rules and approval conditions based on time-of-day or calendar constraints", icon: Clock },
            { name: "Temporary Privilege Assignment", description: "Time-limited ACL-based account authorization that auto-reverts to standard permissions on expiry", icon: Lock },
            { name: "Application Credential Management", description: "Eliminates hard-coded credentials from scripts, config files, databases, Windows Services, registries, and IIS App Pools", icon: Key },
            { name: "Automated Password Changes", description: "Automatically rotates embedded passwords in applications without service interruption", icon: RefreshCw },
            { name: "Application Authentication", description: "All credential-requesting applications are authenticated and protected from unauthorized modification", icon: Shield },
            { name: "API Rate & Access Controls", description: "RPS limiter, IP/CIDR allowlist, time limits, and usage caps on application token requests", icon: Zap },
        ],
    },

    // ─── 7. Audit, Reporting & Compliance ─────────────────────────
    {
        slug: "audit-compliance",
        title: "Audit, Reporting & Compliance",
        tagline: "Complete privileged account accountability for regulatory and internal requirements",
        description:
            "OmniPriv provides full audit trails, scheduled compliance reports, and built-in support for major global regulations — giving auditors and security teams everything they need in one place.",
        metaTitle: "Audit, Reporting & Compliance — OmniPriv PAM",
        metaDescription:
            "Achieve SOX, PCI-DSS, HIPAA, NIST, and GDPR compliance with tamper-proof audit trails, automated reports, and privileged account accountability.",
        icon: BarChart3,
        features: [
            { name: "Privileged Account Accountability", description: "Complete, tamper-proof audit trail of all privileged account activity", icon: Shield },
            { name: "Exclusive Session Access", description: "Option to restrict accounts to one concurrent session, preventing shared or parallel use", icon: Lock },
            { name: "Policy Compliance Alerts", description: "Automatic alerts when privileged accounts fall outside defined credential policies", icon: AlertTriangle },
            { name: "Detailed Reporting", description: "Reports covering entitlements, user activity, asset inventory, and compliance posture", icon: BarChart3 },
            { name: "Scheduled Reports", description: "Reports can be configured to run and deliver automatically on a defined schedule", icon: Clock },
            { name: "Regulatory Frameworks Supported", description: "SOX, PCI-DSS, HIPAA, Basel II, MAS TRM, NIST 800-53, FERC/NERC, and GDPR", icon: CheckCircle2 },
        ],
    },

    // ─── 8. Threat Detection & Response ───────────────────────────
    {
        slug: "threat-detection",
        title: "Threat Detection & Response",
        tagline: "Proactive intelligence against insider threats and privilege abuse",
        description:
            "OmniPriv uses behavioral analytics and automated response to detect credential abuse, lateral movement, and bypass attempts before they cause damage.",
        metaTitle: "Threat Detection & Response — OmniPriv PAM",
        metaDescription:
            "Detect insider threats, credential theft, lateral movement, and PAM bypass attempts with AI-powered behavioral analytics and automated response.",
        icon: AlertTriangle,
        features: [
            { name: "Behavioral Analytics", description: "AI-powered analysis of privileged account activity to surface anomalies and suspicious patterns", icon: BarChart3 },
            { name: "Insider Threat Detection", description: "Continuous monitoring of privileged user behavior for signs of misuse or compromise", icon: Eye },
            { name: "Bypass & Backdoor Detection", description: "Identifies attempts to circumvent PAM controls or exploit undisclosed accounts", icon: AlertTriangle },
            { name: "Lateral Movement Prevention", description: "Privileged administrators are restricted to only their authorized applications on target systems", icon: Network },
            { name: "Credential Theft Detection", description: "Detects harvesting attempts, unusual credential access patterns, and exfiltration indicators", icon: Shield },
            { name: "Automated Threat Response", description: "Triggers automated remediation actions and real-time alerts on confirmed threat events", icon: Zap },
        ],
    },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
    return solutions.find((s) => s.slug === slug);
}
