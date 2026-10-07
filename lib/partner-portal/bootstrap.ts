import { Client } from "pg";
import { hashPassword } from "./password";
import { logAuditEvent } from "./audit";

export interface BootstrapResult {
  executed: boolean;
  action?: "created" | "verified" | "disabled" | "skipped";
  userId?: string;
  username?: string;
  email?: string;
  message: string;
}

const FORBIDDEN_DEFAULT_USERNAMES = new Set([
  "admin",
  "administrator",
  "channeladmin",
  "channel_admin",
  "root",
  "superuser",
]);

/**
 * Validates and executes the server-side Channel Admin bootstrap mechanism.
 * Idempotent, audited, zero secret leakage.
 */
export async function bootstrapChannelAdmin(
  customEnv?: Record<string, string | undefined>,
  clientOverride?: Client
): Promise<BootstrapResult> {
  const env = customEnv ? { ...process.env, ...customEnv } : process.env;

  const isEnabled = env.OMNIPRIV_CHANNEL_ADMIN_BOOTSTRAP_ENABLED === "true";
  if (!isEnabled) {
    return {
      executed: false,
      action: "disabled",
      message: "Channel admin bootstrap is disabled (OMNIPRIV_CHANNEL_ADMIN_BOOTSTRAP_ENABLED != true).",
    };
  }

  // 1. Validate Username
  const rawUsername = env.OMNIPRIV_CHANNEL_ADMIN_USERNAME;
  if (!rawUsername || typeof rawUsername !== "string") {
    throw new Error("Configuration Error: OMNIPRIV_CHANNEL_ADMIN_USERNAME is required when bootstrap is enabled.");
  }
  const username = rawUsername.trim().toLowerCase();
  if (username.length < 5) {
    throw new Error("Configuration Error: OMNIPRIV_CHANNEL_ADMIN_USERNAME must be at least 5 characters long.");
  }
  if (FORBIDDEN_DEFAULT_USERNAMES.has(username)) {
    throw new Error("Security Violation: OMNIPRIV_CHANNEL_ADMIN_USERNAME cannot use common/default names (admin, administrator, channeladmin, etc.). Choose a non-obvious identifier.");
  }

  // 2. Validate Email
  const rawEmail = env.OMNIPRIV_CHANNEL_ADMIN_EMAIL;
  if (!rawEmail || typeof rawEmail !== "string") {
    throw new Error("Configuration Error: OMNIPRIV_CHANNEL_ADMIN_EMAIL is required when bootstrap is enabled.");
  }
  const email = rawEmail.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Configuration Error: OMNIPRIV_CHANNEL_ADMIN_EMAIL must be a valid email address.");
  }

  // 3. Validate Password (Policy: >= 24 characters)
  const rawPassword = env.OMNIPRIV_CHANNEL_ADMIN_PASSWORD;
  if (!rawPassword || typeof rawPassword !== "string") {
    throw new Error("Configuration Error: OMNIPRIV_CHANNEL_ADMIN_PASSWORD is required when bootstrap is enabled.");
  }
  if (rawPassword.length < 24) {
    throw new Error("Security Policy Violation: OMNIPRIV_CHANNEL_ADMIN_PASSWORD must be at least 24 characters in length.");
  }

  const displayName =
    (env.OMNIPRIV_CHANNEL_ADMIN_DISPLAY_NAME || "").trim() ||
    "OmniPriv Channel Administrator";

  // 4. Connect to database
  let client: Client;
  let closeClient = false;

  if (clientOverride) {
    client = clientOverride;
  } else {
    const host = env.PGHOST || "127.0.0.1";
    const port = parseInt(env.PGPORT || "5432", 10);
    const user = env.PGUSER || "postgres";
    const password = env.PGPASSWORD || "";
    const database = env.PGDATABASE || "webomni";

    client = new Client({
      host,
      port,
      user,
      password,
      database,
    });
    await client.connect();
    closeClient = true;
  }

  try {
    // 5. Query for existing user
    const checkRes = await client.query(
      `SELECT id, username, email, system_role, is_active FROM users WHERE LOWER(username) = $1 OR LOWER(email) = $2 LIMIT 1`,
      [username, email]
    );

    if (checkRes.rows.length === 0) {
      // User does not exist: Create new internal Channel Admin
      const passwordHash = await hashPassword(rawPassword);
      const newId = `usr-admin-${Date.now().toString(36)}`;

      await client.query(
        `INSERT INTO users (
          id, username, email, password_hash, display_name,
          system_role, org_id, org_name, partner_membership_status,
          program_status, is_active, is_mfa_enabled
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          newId,
          username,
          email,
          passwordHash,
          displayName,
          "Channel Admin",
          "org-omnipriv-internal",
          "OmniPriv Global Inc.",
          "active",
          "active",
          true,
          true,
        ]
      );

      // Audit log event without credential secrets
      logAuditEvent({
        actor_user_id: "system-bootstrap",
        actor_name: "OmniPriv Bootstrap Engine",
        actor_role: "System",
        actor_org_id: "org-omnipriv-internal",
        action: "channel_admin.bootstrap_created",
        target_type: "OmniPrivUser",
        target_id: newId,
        details: `Channel Admin account initialized via server environment bootstrap for identifier '${username}'. Role assigned: 'Channel Admin'. MFA enforced.`,
        ip_address: "127.0.0.1",
      });

      return {
        executed: true,
        action: "created",
        userId: newId,
        username,
        email,
        message: `Successfully bootstrapped Channel Admin account '${username}'.`,
      };
    } else {
      // User already exists: Idempotent verification & repair without password overwrite
      const existing = checkRes.rows[0];

      if (existing.system_role !== "Channel Admin") {
        await client.query(
          `UPDATE users SET system_role = 'Channel Admin', updated_at = NOW() WHERE id = $1`,
          [existing.id]
        );
      }

      logAuditEvent({
        actor_user_id: "system-bootstrap",
        actor_name: "OmniPriv Bootstrap Engine",
        actor_role: "System",
        actor_org_id: "org-omnipriv-internal",
        action: "channel_admin.bootstrap_role_verified",
        target_type: "OmniPrivUser",
        target_id: existing.id,
        details: `Verified Channel Admin account '${existing.username}'. Role verified as 'Channel Admin'. Password preserved.`,
        ip_address: "127.0.0.1",
      });

      return {
        executed: true,
        action: "verified",
        userId: existing.id,
        username: existing.username,
        email: existing.email,
        message: `Channel Admin account '${existing.username}' already exists. Role verified without altering credentials.`,
      };
    }
  } finally {
    if (closeClient) {
      await client.end();
    }
  }
}
