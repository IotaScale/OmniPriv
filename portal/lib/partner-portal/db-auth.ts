import { Pool } from "pg";
import { AuthUserRecord } from "./auth";
import { verifyPassword } from "./password";
import { logAuditEvent } from "./audit";
import * as fs from "fs";
import * as path from "path";

// Auto-load .env.local or .env if present in standalone node environments
for (const envFile of [".env.local", ".env", "../.env.local", "../.env"]) {
  const envPath = path.resolve(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const k = trimmed.slice(0, eqIdx).trim();
        let v = trimmed.slice(eqIdx + 1).trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        if (!process.env[k]) {
          process.env[k] = v;
        }
      }
    }
  }
}

let dbPool: Pool | null = null;

export function getPool(): Pool {
  if (!dbPool) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

    if (connectionString) {
      const isLocal = connectionString.includes("127.0.0.1") || connectionString.includes("localhost");
      dbPool = new Pool({
        connectionString,
        ssl: isLocal ? false : { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
      });
    } else {
      const host = process.env.PGHOST || "127.0.0.1";
      const isLocal = host === "127.0.0.1" || host === "localhost";
      dbPool = new Pool({
        host,
        port: parseInt(process.env.PGPORT || "5432", 10),
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD || "",
        database: process.env.PGDATABASE || "webomni",
        ssl: isLocal ? false : { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
      });
    }
  }
  return dbPool;
}

/**
 * Production authentication lookup against OmniPriv's unified users table.
 * Zero static identities or plaintext passwords.
 */
export async function verifyUserCredentials(
  identifier: string,
  passwordPlaintext: string,
  clientIp = "127.0.0.1"
): Promise<AuthUserRecord | null> {
  if (!identifier || !passwordPlaintext) {
    return null;
  }

  const cleanIdentifier = identifier.trim().toLowerCase();
  const pool = getPool();

  try {
    const query = `
      SELECT 
        id, username, email, password_hash, display_name,
        system_role, org_id, org_name, partner_membership_status,
        program_status, is_active, is_mfa_enabled, failed_login_attempts,
        locked_until
      FROM users
      WHERE LOWER(username) = $1 OR LOWER(email) = $1
      LIMIT 1;
    `;

    const result = await pool.query(query, [cleanIdentifier]);

    if (result.rows.length === 0) {
      // User not found - Log failure generically without leaking account non-existence
      logAuditEvent({
        actor_user_id: "anonymous",
        actor_name: "Unauthenticated",
        actor_role: "Unknown",
        actor_org_id: "unknown",
        action: "channel.auth.failed",
        target_type: "AuthGateway",
        target_id: cleanIdentifier,
        details: "Authentication rejected: Invalid username or password.",
        ip_address: clientIp,
      });
      return null;
    }

    const row = result.rows[0];

    // Check account lockout
    if (row.locked_until && new Date(row.locked_until) > new Date()) {
      logAuditEvent({
        actor_user_id: row.id,
        actor_name: row.display_name,
        actor_role: row.system_role,
        actor_org_id: row.org_id,
        action: "channel.auth.locked_out",
        target_type: "OmniPrivUser",
        target_id: row.id,
        details: `Authentication blocked: Account '${row.username}' is locked out until ${row.locked_until}.`,
        ip_address: clientIp,
      });
      return {
        id: row.id,
        username: row.username,
        email: row.email,
        name: row.display_name,
        orgId: row.org_id,
        orgName: row.org_name,
        role: row.system_role,
        partnerMembershipStatus: row.partner_membership_status,
        programStatus: row.program_status,
        isActive: false,
        isMfaEnabled: row.is_mfa_enabled,
        isLocked: true,
      };
    }

    // Verify salted scrypt password hash
    const isValidPassword = await verifyPassword(
      passwordPlaintext,
      row.password_hash
    );

    if (!isValidPassword) {
      const attempts = (row.failed_login_attempts || 0) + 1;
      let lockUpdateSql = `UPDATE users SET failed_login_attempts = $1 WHERE id = $2`;
      const lockParams: any[] = [attempts, row.id];

      // Lock out account after 5 consecutive failures
      if (attempts >= 5) {
        lockUpdateSql = `UPDATE users SET failed_login_attempts = $1, locked_until = NOW() + INTERVAL '15 minutes' WHERE id = $2`;
      }

      await pool.query(lockUpdateSql, lockParams);

      logAuditEvent({
        actor_user_id: row.id,
        actor_name: row.display_name,
        actor_role: row.system_role,
        actor_org_id: row.org_id,
        action: "channel.auth.invalid_password",
        target_type: "OmniPrivUser",
        target_id: row.id,
        details: `Authentication failure for user '${row.username}'. Consecutive failure count: ${attempts}.`,
        ip_address: clientIp,
      });

      return null;
    }

    // Successful password match - Reset lockout and update last_login_at
    await pool.query(
      `UPDATE users SET failed_login_attempts = 0, locked_until = NULL, last_login_at = NOW() WHERE id = $1`,
      [row.id]
    );

    return {
      id: row.id,
      username: row.username,
      email: row.email,
      name: row.display_name,
      orgId: row.org_id,
      orgName: row.org_name,
      role: row.system_role as any,
      partnerMembershipStatus: row.partner_membership_status,
      programStatus: row.program_status,
      isActive: row.is_active,
      isMfaEnabled: row.is_mfa_enabled,
      isLocked: false,
    };
  } catch (err: any) {
    console.error("Database authentication query error:", err.message);
    return null;
  }
}
