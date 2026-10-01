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
    { value: "0", label: "Software Agents Required", sub: "100% Agentless architecture" },
    { value: "100%", label: "Encrypted Credential Vault", sub: "AES-256 + SHA-512 & HSM" },
];

export const complianceStandards: ComplianceStandard[] = [
    { code: "SOX", fullName: "Sarbanes-Oxley Act", applicability: "Financial system access governance and privileged account audit" },
    { code: "PCI-DSS", fullName: "Payment Card Industry Data Security Standard", applicability: "Cardholder data environment access control & session isolation" },
    { code: "HIPAA", fullName: "Health Insurance Portability and Accountability Act", applicability: "Protected health information access governance & audit logging" },
    { code: "Basel II", fullName: "Basel II Accord", applicability: "Operational risk management for financial institutions" },
    { code: "MAS TRM", fullName: "Monetary Authority of Singapore Guidelines", applicability: "Technology risk controls for financial entities & remote access" },
    { code: "NIST 800-53", fullName: "NIST Special Publication 800-53", applicability: "Federal security and privacy controls framework" },
    { code: "FERC / NERC CIP", fullName: "Critical Infrastructure Protection", applicability: "Critical energy and utility infrastructure security standards" },
    { code: "GDPR", fullName: "General Data Protection Regulation", applicability: "EU data protection and privacy for sensitive personal data" },
    { code: "ISO 27001", fullName: "Information Security Management System", applicability: "International information security and access management standard" },
];

export const platformSpecs: PlatformSpec[] = [
    { label: "Deployment Model", value: "On-Premise (VMware, Red Hat, OpenStack / OpenSource platforms)" },
    { label: "Architecture", value: "100% Agentless — no software agents on endpoints, servers, or workstations" },
    { label: "Interface", value: "Browser Web GUI (Edge, Chrome, Firefox, Safari) + Command-Line CLI" },
    { label: "Mobile Client", value: "Built-in mobile browser client with TOTP 2FA, approvals & geofencing" },
    { label: "High Availability", value: "Multi-node clustering, Docker health checks, WebSocket heartbeat & DB replication" },
    { label: "Multi-Tenancy", value: "Strict org_id isolation per resource (PostgreSQL schema-per-tenant), ROOT/DEFAULT/SYSTEM orgs" },
    { label: "Encryption", value: "SHA-256 / SHA-512 with AES-256-GCM envelope encryption & external SECRET_KEY" },
    { label: "Hardware Security", value: "Hardware Security Module (HSM) integration for root-of-trust protection" },
    { label: "Supported Protocols", value: "SSH, RDP, VNC, HTTP, Database (Native DB clients via transparent proxy)" },
    { label: "Approval Principle", value: "4-Eyes principle (minimum 2 independent approvers, no self-approval)" },
    { label: "AI & Threat Analytics", value: "AI keystroke dynamics anomaly detection & real-time behavioral analytics" },
    { label: "Disaster Recovery", value: "Break-glass emergency procedure + granular credential restore without full system restore" },
];

export const solutions: Solution[] = [    // ─── AI Agent Governance (AI-first: intentionally listed first) ─
    {
        slug: "ai-agent-governance",
        title: "AI Agent Governance",
        tagline: "Verifiable identity, tool allowlist and data scope for every AI agent",
        description:
            "OmniPriv governs autonomous AI agents and MCP servers with a verifiable identity per agent, an explicit tool allowlist, a bounded data scope, and human approval on high-risk actions.",
        metaTitle: "AI Agent Governance — OmniPriv PAM",
        metaDescription:
            "Govern autonomous AI agents and MCP servers with a verifiable identity, tool allowlist, data scope and human approval on high-risk actions.",
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
            "OmniPriv deploys on-premise across VMware, Red Hat, and OpenStack platforms with no software agents required on any device, server, or endpoint. Delivered as a software appliance with multi-node clustering and granular disaster recovery.",
        metaTitle: "Infrastructure & Deployment — OmniPriv PAM",
        metaDescription:
            "Deploy OmniPriv on-premise across VMware, Red Hat, and OpenStack with agentless architecture, high availability, and granular disaster recovery.",
        icon: Server,
        features: [
            { name: "On-Premise Deployment", description: "Deploys on-premise supporting VMware, Red Hat, and OpenStack/OpenSource-based infrastructure platforms", icon: Server },
            { name: "Agentless Architecture", description: "No software agents required on devices, servers, or user workstations — zero operational complexity", icon: Zap },
            { name: "Browser-Based GUI & CLI", description: "Full platform control via browser console (Edge, Chrome, Firefox, Safari) and powerful CLI", icon: Globe },
            { name: "Unified Administration Console", description: "Centralized management within a single UI and central credential repository — no multi-console management", icon: Layers },
            { name: "Software Appliance", description: "Delivered as a software-based appliance for streamlined, hardware-agnostic enterprise deployment", icon: Cpu },
            { name: "High Availability & Redundancy", description: "Multi-node clustering with Docker-based health checks, auto-restart, WebSocket heartbeat monitoring, database replication, and load balancing", icon: RefreshCw },
            { name: "Distributed Zone & Gateway Architecture", description: "Zone model for remote segments; Gateway proxies SSH and RDP per zone, managed from one unified control plane", icon: Network },
            { name: "Strict Multi-Tenancy", description: "Strict tenant isolation via org_id on every resource (PostgreSQL schema-per-tenant), with per-organization RBAC and ROOT/DEFAULT/SYSTEM orgs", icon: Building2 },
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
            { name: "Mobile Client — TOTP & Vault Access", description: "Built-in mobile client accessible from any mobile browser without installation; supports TOTP 2FA, ticket approvals, geofencing controls, and role-based vault access", icon: Monitor },
            { name: "Offline Device Credential Management", description: "Manages and maintains credentials for devices not frequently connected to the corporate network", icon: Globe },
        ],
    },

    // ─── 3. Application Security & Encryption ─────────────────────
    {
        slug: "application-security",
        title: "Application Security & Encryption",
        tagline: "AI-powered credential protection with enterprise-grade encryption",
        description:
            "OmniPriv enforces multi-factor authentication, full encryption in transit and at rest, Hardware Security Module (HSM) integration, and AI-driven keystroke behavioral anomaly detection to protect every layer of privileged access.",
        metaTitle: "Application Security & Encryption — OmniPriv PAM",
        metaDescription:
            "Protect privileged access with MFA, AES/SHA encryption, HSM integration, tamper-proof audit storage, and AI-powered anomaly detection.",
        icon: Shield,
        features: [
            { name: "Multi-Factor Authentication (MFA)", description: "Integrates with MFA for strong authentication including Biometric, Hardware Token, TOTP, SMS-based 2FA, and Email-based OTP", icon: Fingerprint },
            { name: "HSM Integration & Credential Encryption", description: "Credentials protected with encryption and Hardware Security Module (HSM) integration; all sensitive data encrypted in transit and at rest", icon: Cpu },
            { name: "Adaptive MFA with AI Keystroke Anomaly Detection", description: "AI engine continuously analyzes keystroke dynamics during login (rhythm, speed, patterns against behavioral baseline), automatically triggering MFA on anomaly detection", icon: AlertTriangle },
            { name: "SHA-256 / SHA-512 & AES-256-GCM", description: "All sensitive data encrypted at rest and in transit using SHA-256 and SHA-512 mechanisms, backed by AES-256-GCM envelope encryption", icon: Lock },
            { name: "Encrypted Inter-Component Communication", description: "All communication between system components is encrypted over mTLS — no plaintext transmission at any layer", icon: Network },
            { name: "Encrypted Backups with Secure Key Management", description: "Fully encrypted backups with independent, secure key management ensuring backup integrity and confidentiality", icon: Database },
            { name: "Role-Based Access Isolation", description: "Administrators strictly cannot access credentials or approve requests outside their defined role boundaries enforced at every access layer", icon: UserCheck },
            { name: "Tamper-Proof Audit Storage", description: "Audit records stored in secure, tamper-proof storage with cryptographic audit-chain hashing ensuring integrity and non-repudiation", icon: Shield },
            { name: "Zero Hard-Coded Credentials", description: "Platform contains zero hard-coded credentials; all secrets are vault-managed and fully auditable", icon: Key },
            { name: "Independent Cryptographic Key Backup", description: "SECRET_KEY generated at installation must be stored externally and independently from the platform; maintained across upgrades and migrations", icon: Lock },
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

    // ─── 5. Privileged Session Management ─────────────────────────
    {
        slug: "session-management",
        title: "Privileged Session Management",
        tagline: "Complete visibility and control over every privileged session",
        description:
            "OmniPriv records, isolates, and monitors all privileged sessions across protocols — featuring transparent database proxying with dynamic data masking, script monitoring, and searchable session forensics.",
        metaTitle: "Privileged Session Management — OmniPriv PAM",
        metaDescription:
            "Record, isolate, and monitor privileged sessions across SSH, RDP, VNC, HTTP, and databases with searchable audit trails and real-time controls.",
        icon: Monitor,
        features: [
            { name: "Full Session Recording & Monitoring", description: "All privileged sessions fully monitored and recorded; high-fidelity video playback stored securely with controlled access — no agent reliance required", icon: Eye },
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

    // ─── 7. Audit, Reporting & Compliance ─────────────────────────
    {
        slug: "audit-compliance",
        title: "Audit, Reporting & Compliance",
        tagline: "Complete privileged account accountability for regulatory and internal requirements",
        description:
            "OmniPriv provides complete audit trails, scheduled compliance reports, and out-of-the-box alignment for 9 major regulatory frameworks including SOX, PCI-DSS, HIPAA, Basel II, MAS TRM, and NIST 800-53.",
        metaTitle: "Audit, Reporting & Compliance — OmniPriv PAM",
        metaDescription:
            "Achieve SOX, PCI-DSS, HIPAA, NIST, and GDPR compliance with tamper-proof audit trails, automated reports, and privileged account accountability.",
        icon: BarChart3,
        features: [
            { name: "Full Privileged Account Accountability", description: "Complete, tamper-proof audit trail of all privileged account usage; every action logged with user, time, asset, and outcome", icon: Shield },
            { name: "Exclusive Session Access Control", description: "Option to restrict accounts to one concurrent session, preventing shared or parallel privileged access", icon: Lock },
            { name: "Policy Compliance Alerts", description: "Automatic alerts generated when a privileged account is found non-compliant with defined credential policies", icon: AlertTriangle },
            { name: "Detailed & Scheduled Reporting", description: "Comprehensive reports covering entitlements, user activity, asset inventory, and compliance posture, schedulable for automatic generation", icon: BarChart3 },
            { name: "9 Major Regulatory Standards Supported", description: "Pre-configured compliance mappings for SOX, PCI-DSS, HIPAA, Basel II, MAS TRM, NIST 800-53, FERC/NERC CIP, GDPR, and ISO 27001", icon: CheckCircle2 },
        ],
    },

    // ─── 8. Threat Detection & Response ───────────────────────────
    {
        slug: "threat-detection",
        title: "Threat Detection & Response",
        tagline: "Proactive intelligence against insider threats and privilege abuse",
        description:
            "OmniPriv uses intelligence-based behavioral analytics to detect insider threats, backdoor attempts, lateral movement, and credential harvesting in real time, triggering automated remediation actions.",
        metaTitle: "Threat Detection & Response — OmniPriv PAM",
        metaDescription:
            "Detect insider threats, credential theft, lateral movement, and PAM bypass attempts with AI-powered behavioral analytics and automated response.",
        icon: AlertTriangle,
        features: [
            { name: "Behavioural Analytics Engine", description: "Intelligence-based analytics continuously monitoring privileged account activity to detect suspicious patterns and behavioural anomalies", icon: BarChart3 },
            { name: "Insider Threat Detection", description: "Continuous monitoring of privileged user behaviour for signs of misuse, compromise, or policy violation by internal actors", icon: Eye },
            { name: "PAM Bypass & Backdoor Detection", description: "Detects attempts to circumvent privileged access controls, exploit undisclosed accounts, or establish unauthorized backdoor access", icon: AlertTriangle },
            { name: "Lateral Movement Prevention", description: "Privileged administrators restricted to only their specifically authorized applications on target systems, preventing traversal across infrastructure", icon: Network },
            { name: "Credential Theft & Harvesting Detection", description: "Detects credential harvesting attempts, unusual credential access patterns, and exfiltration indicators in real time", icon: Shield },
            { name: "Automated Threat Response & Alerting", description: "Triggers automated remediation actions and real-time alerts on confirmed threat events; security operations team notified immediately", icon: Zap },
        ],
    },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
    return solutions.find((s) => s.slug === slug);
}
