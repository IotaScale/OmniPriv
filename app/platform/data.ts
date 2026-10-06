import {
    Server, Key, Shield, Building2, Monitor,
    Workflow, BarChart3, AlertTriangle, Bot,
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

export interface ComplianceStandard {
    code: string;
    fullName: string;
    applicability: string;
}

export interface PlatformSpec {
    label: string;
    value: string;
}

export const datasheetStats = [
    { value: "80+", label: "Requirement Points Covered", sub: "Enterprise PAM coverage" },
    { value: "9", label: "Core Capability Modules", sub: "End-to-end access lifecycle" },
    { value: "6", label: "Compliance & Certifications", sub: "SOC 2 · ISO 27001 · HIPAA + more" },
    { value: "100%", label: "Encrypted Credential Vault", sub: "Encrypted at rest and in transit" },
];

export const complianceStandards: ComplianceStandard[] = [
    { code: "SOC 2", fullName: "System and Organization Controls 2", applicability: "Independent audit of security, availability and confidentiality controls" },
    { code: "ISO 27001", fullName: "Information Security Management System", applicability: "International information security and access management standard" },
    { code: "NIST SP 800-53", fullName: "NIST Special Publication 800-53", applicability: "Federal security and privacy controls framework" },
    { code: "HIPAA", fullName: "Health Insurance Portability and Accountability Act", applicability: "Protected health information access governance & audit logging" },
    { code: "PCI DSS", fullName: "Payment Card Industry Data Security Standard", applicability: "Cardholder data environment access control & session isolation" },
    { code: "SOX 404", fullName: "Sarbanes-Oxley Act Section 404", applicability: "Financial system access governance and privileged account audit" },
];

export const platformSpecs: PlatformSpec[] = [
    { label: "Deployment Model", value: "On-Premise (VMware, Red Hat, OpenStack / OpenSource platforms)" },
    { label: "Interface", value: "Browser Web GUI (Edge, Chrome, Firefox, Safari) + Command-Line CLI" },
    { label: "Mobile Client", value: "Built-in mobile browser client with TOTP 2FA and ticket approvals" },
    { label: "High Availability", value: "Multi-node clustering, container health checks, heartbeat monitoring & DB replication" },
    { label: "Multi-Tenancy", value: "Strict org_id isolation per resource (schema-per-tenant), ROOT/DEFAULT/SYSTEM orgs" },
    { label: "Encryption", value: "All sensitive data encrypted at rest and in transit" },
    { label: "Hardware Security", value: "Hardware security module integration for root-of-trust key protection" },
    { label: "Supported Protocols", value: "SSH, RDP, VNC, HTTP, Database (Native DB clients via transparent proxy)" },
    { label: "Approval Principle", value: "4-Eyes principle (minimum 2 independent approvers, no self-approval)" },
    { label: "AI & Threat Analytics", value: "AI keystroke dynamics anomaly detection & real-time behavioral analytics" },
    { label: "Disaster Recovery", value: "Break-glass emergency procedure + granular credential restore without full system restore" },
];

export const solutions: Solution[] = [    // ─── AI Agent Governance (AI-first: intentionally listed first) ─
    {
        slug: "secure-ai-agents-omnipriv",
        title: "Secure AI Agents",
        tagline: "Scoped privilege, tool allowlists and recorded sessions for every AI agent",
        description:
            "Strengthen AI agent security with JIT access, least privilege, credential protection, and governed access for AI-powered identities and automated workflows.",
        metaTitle: "Secure AI Agents with Privileged Access | OmniPriv",
        metaDescription:
            "Strengthen AI agent security with JIT access, least privilege, credential protection, and governed access for AI-powered identities and automated workflows.",
        icon: Bot,
        features: [
            { name: "Verifiable Agent Identity", description: "Every MCP agent is registered as its own identity with its own credentials — never a borrowed human account or a shared service account", icon: Fingerprint },
            { name: "Tool Allowlist Enforcement", description: "An agent may call only the tools and MCP servers explicitly permitted for its task; everything else is refused at policy evaluation", icon: Shield },
            { name: "Bounded Data Scope", description: "Each agent's reach is limited to the records and resources the approved task actually requires", icon: Database },
            { name: "Human Approval on High-Risk Actions", description: "Actions classified as high risk are held for human approval before they execute, with multi-approver chains and time-based conditions", icon: UserCheck },
            { name: "Runtime Policy Enforcement", description: "Every tool call, query and command is evaluated against policy before it runs — not once when the session opens", icon: Zap },
            { name: "Agent Session Audit Trail", description: "Every agent session is recorded in full and tied back to the identity that directed it", icon: FileSearch },
        ],
    },
    // ─── 1. Infrastructure & Deployment ───────────────────────────
    {
        slug: "infrastructure-deployment",
        title: "Infrastructure & Deployment",
        tagline: "Flexible on-premise deployment across any enterprise environment",
        description:
            "OmniPriv deploys on-premise across VMware, Red Hat, and OpenStack platforms. Delivered as a software appliance with multi-node clustering and granular disaster recovery.",
        metaTitle: "Infrastructure & Deployment — OmniPriv PAM",
        metaDescription:
            "Deploy OmniPriv on-premise across VMware, Red Hat, and OpenStack with high availability, clustered nodes and granular disaster recovery.",
        icon: Server,
        features: [
            { name: "On-Premise Deployment", description: "Deploys on-premise supporting VMware, Red Hat, and OpenStack/OpenSource-based infrastructure platforms", icon: Server },
            { name: "Browser-Based GUI & CLI", description: "Full platform control via browser console (Edge, Chrome, Firefox, Safari) and powerful CLI", icon: Globe },
            { name: "Unified Administration Console", description: "Centralized management within a single UI and central credential repository — no multi-console management", icon: Layers },
            { name: "Software Appliance", description: "Delivered as a software-based appliance for streamlined, hardware-agnostic enterprise deployment", icon: Cpu },
            { name: "High Availability & Redundancy", description: "Multi-node clustering with container-based health checks, auto-restart, heartbeat monitoring, database replication, and load balancing", icon: RefreshCw },
            { name: "Strict Multi-Tenancy", description: "Strict tenant isolation via org_id on every resource (schema-per-tenant), with per-organization RBAC and ROOT/DEFAULT/SYSTEM orgs", icon: Building2 },
            { name: "Secondary Security Password", description: "Secondary Security Password enforced as an additional mandatory layer for Password Vault access", icon: Lock },
            { name: "Break-Glass Emergency Access", description: "Built-in break-the-glass procedure to bypass the PAM solution in emergency situations while maintaining full audit trail", icon: Key },
            { name: "Enhanced Disaster Recovery", description: "Restores credentials without restoring the entire system; granular backup and restoration capabilities minimize downtime", icon: Database },
            { name: "Offline Device Management", description: "Manages and maintains credentials for devices not frequently connected to the corporate network", icon: Monitor },
        ],
    },

    // ─── 2. Password & Credential Management ──────────────────────
    {
        slug: "password-credential-management",
        title: "Password & Credential Management",
        tagline: "Automated credential lifecycle management at enterprise scale",
        description:
            "OmniPriv automates the full lifecycle of privileged credentials — from policy-driven rotation and validation to SSH key lifecycle and bulk onboarding — ensuring every secret stays secure, synchronized, and auditable.",
        metaTitle: "Password & Credential Management — OmniPriv PAM",
        metaDescription:
            "Automate credential rotation, SSH key management, password reconciliation, and bulk onboarding with OmniPriv's enterprise credential vault.",
        icon: Key,
        features: [
            { name: "Automated Credential Rotation", description: "Policy-driven rotation with configurable recurrence, rotation period, and daily start time globally or per platform/policy", icon: RefreshCw },
            { name: "SSH Key Management Lifecycle", description: "Full SSH key lifecycle — store, rotate, and push key pairs via Change Secret engine; private keys encrypted in vault and never exposed outside; self-service reset workflow", icon: Key },
            { name: "One-Time Password Enforcement", description: "Enforces single-use passwords with automatic credential rotation immediately after each use", icon: Lock },
            { name: "Credential Validation & De-sync Resolution", description: "Verify Account Secrets actively tests stored credentials against live assets; automatically pushes corrected passwords when de-sync is detected", icon: CheckCircle2 },
            { name: "Automatic Password Reconciliation", description: "Scheduled reconciliation plans detect and reconcile out-of-sync or lost passwords automatically without external utilities; MFA required to view updated credentials", icon: RefreshCw },
            { name: "Password Groups", description: "Administrators define groups where all member accounts automatically share the same password value, propagating updates instantly to all linked accounts", icon: Layers },
            { name: "Full Password History", description: "Versioned credential history maintained and accessible by approved users for a configured retention period", icon: Clock },
            { name: "Bulk Onboarding Enrollment", description: "Mass enrollment of privileged entities with automatic provisioning of all built-in accounts, privileges, rights, and permissions to organizational standards", icon: Database },
            { name: "Mobile Client — TOTP & Vault Access", description: "Built-in mobile client accessible from any mobile browser without installation; supports TOTP 2FA, ticket approvals, and role-based vault access", icon: Monitor },
            { name: "Offline Device Credential Management", description: "Manages and maintains credentials for devices not frequently connected to the corporate network", icon: Globe },
        ],
    },

    // ─── 3. Application Security & Encryption ─────────────────────
    {
        slug: "application-security",
        title: "Application Security & Encryption",
        tagline: "AI-powered credential protection with enterprise-grade encryption",
        description:
            "OmniPriv enforces multi-factor authentication, encryption of data at rest and in transit, hardware-backed key protection, and AI-driven keystroke behavioural anomaly detection to protect every layer of privileged access.",
        metaTitle: "Application Security & Encryption — OmniPriv PAM",
        metaDescription:
            "Protect privileged access with MFA, encryption at rest and in transit, tamper-proof audit storage, and AI-powered anomaly detection.",
        icon: Shield,
        features: [
            { name: "Multi-Factor Authentication (MFA)", description: "Integrates with MFA for strong authentication including Biometric, Hardware Token, TOTP, SMS-based 2FA, and Email-based OTP", icon: Fingerprint },
            { name: "Credential Encryption with Hardware Key Protection", description: "Credentials are encrypted and their keys protected by a hardware security module; all sensitive data is encrypted in transit and at rest", icon: Cpu },
            { name: "Adaptive MFA with AI Keystroke Anomaly Detection", description: "AI engine continuously analyzes keystroke dynamics during login (rhythm, speed, patterns against behavioral baseline), automatically triggering MFA on anomaly detection", icon: AlertTriangle },
            { name: "Encryption at Rest and in Transit", description: "All sensitive data is encrypted both at rest and in transit, with encryption keys protected by a hardware security module", icon: Lock },
            { name: "Encrypted Inter-Component Communication", description: "All communication between system components is mutually authenticated and encrypted — no plaintext transmission at any layer", icon: Network },
            { name: "Encrypted Backups with Secure Key Management", description: "Fully encrypted backups with independent, secure key management ensuring backup integrity and confidentiality", icon: Database },
            { name: "Role-Based Access Isolation", description: "Administrators strictly cannot access credentials or approve requests outside their defined role boundaries enforced at every access layer", icon: UserCheck },
            { name: "Tamper-Proof Audit Storage", description: "Audit records stored in secure, tamper-proof storage with cryptographic audit-chain hashing ensuring integrity and non-repudiation", icon: Shield },
            { name: "Zero Hard-Coded Credentials", description: "Platform contains zero hard-coded credentials; all secrets are vault-managed and fully auditable", icon: Key },
            { name: "Independent Key Backup", description: "The installation key must be stored externally and independently from the platform, and is maintained across upgrades and migrations", icon: Lock },
        ],
    },

    // ─── 4. Enterprise & Identity Integration ─────────────────────
    {
        slug: "enterprise-integration",
        title: "Enterprise & Identity Integration",
        tagline: "Seamless integration with your existing enterprise ecosystem",
        description:
            "OmniPriv connects natively with enterprise ticketing systems, SIEM platforms, identity management solutions, and LDAP/AD directories to ensure privileged access fits seamlessly into existing enterprise workflows.",
        metaTitle: "Enterprise & Identity Integration — OmniPriv PAM",
        metaDescription:
            "Integrate PAM with ticketing, SIEM, identity management, and LDAP/AD for unified privileged access governance across your enterprise.",
        icon: Building2,
        features: [
            { name: "Built-In Ticketing with 6 Request Types", description: "Supports 6 request types: General, Asset Permission, Application, Command Confirm, Login Confirm, and Login Asset Confirm, each with configurable multi-level approvals", icon: FileSearch },
            { name: "Pre-Access Ticket Verification", description: "Mandatory prerequisite before privileged credential release; real-time status check blocks pending, rejected, or closed tickets automatically", icon: CheckCircle2 },
            { name: "Automatic Ticket Creation on Retrieval", description: "A ticket and full approval workflow are automatically triggered on every privileged password retrieval request; credentials withheld until approved", icon: Workflow },
            { name: "Real-Time SIEM Integration", description: "Forwards privileged access events to SIEM platforms in real time for centralized security monitoring and event correlation", icon: Network },
            { name: "Identity Management Integration", description: "Integrates with enterprise Identity Management systems for user lifecycle management and automated provisioning", icon: UserCheck },
            { name: "LDAP / Active Directory Integration", description: "Bidirectional sync with LDAP/AD directories; automatic user and group provisioning; supports user entitlement management", icon: Globe },
            { name: "RDP / SSH / VNC / HTTP Proxies", description: "Supports RDP, SSH, VNC, and HTTP proxies; users can access Password Vault based on their privilege level in addition to standard connections", icon: Monitor },
        ],
    },

    // ─── 5. Secure Remote Access ───────────────────────────────────
    {
        slug: "secure-remote-access",
        title: "Secure Remote & Hybrid Access",
        tagline: "Privileged remote access for a distributed workforce",
        description:
            "Enable secure remote access for administrators, employees, and vendors with MFA, JIT privileges, credential protection, and monitored sessions.",
        metaTitle: "Secure Remote & Hybrid Access | OmniPriv",
        metaDescription:
            "Enable secure remote access for administrators, employees, and vendors with MFA, JIT privileges, credential protection, and monitored sessions.",
        icon: Monitor,
        features: [
            { name: "Remote Access Without Inbound Ports", description: "Privileged SSH, RDP, VNC and database access from any location, brokered through the platform rather than by exposing target systems to the internet", icon: Globe },
            { name: "Just-in-Time Privileges", description: "Time-limited, purpose-specific permissions that expire automatically, replacing standing administrative rights for remote users", icon: Clock },
            { name: "MFA & Zero Trust Enforcement", description: "Authenticate and authorize every privileged session with MFA, enterprise SSO and contextual risk controls instead of trusting network location", icon: Shield },
            { name: "Credential Protection", description: "Vaulted credentials injected on the far side of the connection with automated rotation, so remote users never handle a raw privileged secret", icon: Key },
            { name: "Full Session Recording & Monitoring", description: "All privileged sessions fully monitored and recorded; high-fidelity video playback stored securely with controlled access", icon: Eye },
            { name: "Session Isolation & Air-Gap", description: "Air-gap enforced between target devices and user workstations; credentials are never disclosed or transmitted to endpoints", icon: Shield },
            { name: "Multi-Platform Protocol Support", description: "Session recording and isolation across SSH, RDP, VNC, HTTP, and database protocol sessions", icon: Globe },
            { name: "Concurrent Session Scaling", description: "Scales to support high volumes of simultaneous privileged sessions without additional licenses or appliances, with per-asset single active session enforcement", icon: Layers },
            { name: "Contextual & Searchable Session History", description: "Session recordings are contextual, fully indexed, and searchable after the fact for compliance review, investigation, or audit", icon: FileSearch },
            { name: "Session Controls & Automated Actions", description: "Prevents specific user actions and triggers automated responses on session events (e.g., auto-terminate on policy violation)", icon: Lock },
            { name: "Script Monitoring & Audit", description: "Every script executed during a privileged session is monitored and logged; all actions performed by scripts are captured in the audit trail", icon: FileSearch },
            { name: "Native Client Support", description: "User experience maintained — administrators can use their preferred clients and tools without workflow disruption", icon: Monitor },
            { name: "Granular HTTP Session Monitoring", description: "Granular HTTP request-level monitoring and logging beyond simple video recording; stores historical sessions with detailed activity logs", icon: Network },
            { name: "Database Query Controls & Dynamic Data Masking", description: "Query blacklist/whitelist controls and dynamic data masking for native database clients via transparent proxy — no jump server, extra hardware, or OS required", icon: Database },
        ],
    },

    // ─── 6. Workflow & Access Control ─────────────────────────────
    {
        slug: "workflow-access-control",
        title: "Workflow & Access Control",
        tagline: "Structured, policy-driven privileged access with full approval governance",
        description:
            "OmniPriv enforces 4-Eyes approval workflows, temporary privilege assignments, and application credential management — rotating hard-coded passwords in config files, Windows Services, and IIS App Pools.",
        metaTitle: "Workflow & Access Control — OmniPriv PAM",
        metaDescription:
            "Enforce 4-eyes approval, multi-level workflows, time-based policies, and application credential management for complete privileged access governance.",
        icon: Workflow,
        features: [
            { name: "4-Eyes Approval Principle", description: "Minimum two independent approvers required before access is granted; no user can self-approve their own privileged access request", icon: UserCheck },
            { name: "Mobile & Email Approvals", description: "Privileged access requests, approvals, and credential retrieval supported from mobile devices; approvals via web GUI, mobile client, or email link without logging in", icon: Monitor },
            { name: "Multi-Level Flexible Workflows", description: "Configurable multi-level approval chains supporting multiple approvers per step; each approval level must complete before progressing", icon: Layers },
            { name: "Time-Based Workflow Conditions", description: "Workflows, policies, and approval rules configurable based on time-of-day or calendar-based conditions", icon: Clock },
            { name: "Temporary Privileged Account Assignment", description: "Account authorization for a specific timeframe and target asset; ACL-based mapping auto-reverts to standard restricted account on expiry", icon: Lock },
            { name: "Application Credential Management", description: "Eliminates hard-coded credentials in configuration files, databases, registries, Windows Services, scheduled tasks, and IIS App Pools with automated rotation", icon: Key },
            { name: "Zero-Latency Application Credential Handling", description: "Critical applications retrieve credentials without introducing latency or reliance on remote repositories", icon: Zap },
            { name: "Application Authentication & Protection", description: "All applications requesting credentials are authenticated and protected against unauthorized changes to prevent credential interception", icon: Shield },
            { name: "API Rate & Access Controls", description: "RPS (Request Per Second) limiter, Client IP/CIDR allowlist, Time Limit, and Usage Limit controls on all application token requests", icon: Network },
        ],
    },

    // ─── 7. Audit, Governance & Compliance ────────────────────────
    {
        slug: "audit-compliance",
        title: "Audit, Governance & Compliance",
        tagline: "Complete privileged account accountability for regulatory and internal requirements",
        description:
            "Simplify privileged access audits with centralized activity logs, policy controls, session records, and compliance-ready reporting across critical systems.",
        metaTitle: "Audit, Governance & Compliance | OmniPriv",
        metaDescription:
            "Simplify privileged access audits with centralized activity logs, policy controls, session records, and compliance-ready reporting across critical systems.",
        icon: BarChart3,
        features: [
            { name: "Full Privileged Account Accountability", description: "Complete, tamper-proof audit trail of all privileged account usage; every action logged with user, time, asset, and outcome", icon: Shield },
            { name: "Exclusive Session Access Control", description: "Option to restrict accounts to one concurrent session, preventing shared or parallel privileged access", icon: Lock },
            { name: "Policy Compliance Alerts", description: "Automatic alerts generated when a privileged account is found non-compliant with defined credential policies", icon: AlertTriangle },
            { name: "Detailed & Scheduled Reporting", description: "Comprehensive reports covering entitlements, user activity, asset inventory, and compliance posture, schedulable for automatic generation", icon: BarChart3 },
            { name: "6 Compliance Frameworks Mapped", description: "Pre-configured compliance mappings for SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404", icon: CheckCircle2 },
        ],
    },

    // ─── 8. Defend Against AI-Driven Threats ──────────────────────
    {
        slug: "ai-threat-protection",
        title: "Defend Against AI-Driven Threats",
        tagline: "Machine-learning detection and automated response at the privileged-access layer",
        description:
            "Improve AI threat protection with intelligent anomaly detection, privileged access controls, session monitoring, and rapid response to suspicious activity.",
        metaTitle: "Defend Against AI-Driven Threats | OmniPriv",
        metaDescription:
            "Improve AI threat protection with intelligent anomaly detection, privileged access controls, session monitoring, and rapid response to suspicious activity.",
        icon: AlertTriangle,
        features: [
            { name: "ML Anomaly Detection", description: "Machine-learning behavioural scoring across 39 features for every closed privileged session, identifying activity that diverges from an identity's established baseline", icon: BarChart3 },
            { name: "Insider & Credential Theft Detection", description: "Detects credential harvesting, privilege abuse, unusual command patterns, abnormal access times and attempts to bypass PAM controls in real time", icon: Eye },
            { name: "Lateral Movement Prevention", description: "Privileged administrators are restricted to only their specifically authorized applications on target systems, preventing traversal across infrastructure", icon: Network },
            { name: "Just-in-Time Privileged Access", description: "Task-specific permissions issued on request and expiring automatically, reducing standing privilege and the access a compromised identity inherits", icon: Clock },
            { name: "Privileged Credential Protection", description: "Encrypted vaulting with automated rotation of passwords, SSH keys and API tokens on schedule or immediately after a privileged session", icon: Key },
            { name: "Automated Threat Response & Alerting", description: "Tiered escalation from dashboard alert to admin alert to automatic block, driven by a sweeper that reviews active sessions every ten seconds", icon: Zap },
        ],
    },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
    return solutions.find((s) => s.slug === slug);
}
