import { Client } from "pg";
import * as fs from "fs";
import * as path from "path";

// Auto-load .env.local or .env if present
for (const envFile of [".env.local", ".env"]) {
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

async function runMigrations() {
  const host = process.env.PGHOST || "127.0.0.1";
  const port = parseInt(process.env.PGPORT || "5432", 10);
  const user = process.env.PGUSER || "postgres";
  const password = process.env.PGPASSWORD || "";
  const targetDb = process.env.PGDATABASE || "omnipriv";

  console.log(`\n======================================================`);
  console.log(`   OmniPriv PostgreSQL Migration Engine`);
  console.log(`======================================================`);
  console.log(`Connecting to PostgreSQL host: ${host}:${port} as user: ${user}`);

  // Step 1: Ensure target database exists by connecting to default 'postgres' database
  const maintenanceClient = new Client({
    host,
    port,
    user,
    password,
    database: "postgres",
  });

  try {
    await maintenanceClient.connect();
    console.log(`[OK] Connected to PostgreSQL instance.`);

    const checkDbRes = await maintenanceClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [targetDb]
    );

    if (checkDbRes.rowCount === 0) {
      console.log(`[*] Target database "${targetDb}" does not exist. Creating...`);
      await maintenanceClient.query(`CREATE DATABASE "${targetDb}"`);
      console.log(`[OK] Created database "${targetDb}".`);
    } else {
      console.log(`[OK] Target database "${targetDb}" already exists.`);
    }
  } catch (err: any) {
    console.error(`[!] Maintenance connection error: ${err.message}`);
    throw err;
  } finally {
    await maintenanceClient.end();
  }

  // Step 2: Connect to target database
  const appClient = new Client({
    host,
    port,
    user,
    password,
    database: targetDb,
  });

  try {
    await appClient.connect();
    console.log(`[OK] Connected to target database "${targetDb}".`);

    // Step 3: Initialize migrations tracking table
    await appClient.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Step 4: Scan and sort migration files
    const migrationsDir = path.resolve(__dirname, "../migrations");
    if (!fs.existsSync(migrationsDir)) {
      throw new Error(`Migrations directory not found: ${migrationsDir}`);
    }

    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    console.log(`\nFound ${files.length} migration file(s) in migrations/:`);

    for (const file of files) {
      const alreadyApplied = await appClient.query(
        `SELECT 1 FROM _migrations WHERE filename = $1`,
        [file]
      );

      if (alreadyApplied.rowCount && alreadyApplied.rowCount > 0) {
        console.log(`  -> [SKIPPED] ${file} (already applied)`);
        continue;
      }

      console.log(`  -> [APPLYING] ${file}...`);
      const sqlContent = fs.readFileSync(path.join(migrationsDir, file), "utf8");

      await appClient.query(sqlContent);
      await appClient.query(
        `INSERT INTO _migrations (filename) VALUES ($1)`,
        [file]
      );
      console.log(`  -> [SUCCESS] Applied ${file}`);
    }

    // Step 5: Verification of all 17 tables
    const tableVerification = await appClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        AND table_name NOT IN ('_migrations')
      ORDER BY table_name;
    `);

    console.log(`\n======================================================`);
    console.log(`   Verification: Active OmniPriv Tables (${tableVerification.rowCount})`);
    console.log(`======================================================`);
    tableVerification.rows.forEach((r, idx) => {
      console.log(`  ${(idx + 1).toString().padStart(2, " ")}. public.${r.table_name}`);
    });

    console.log(`\n[ALL MIGRATIONS COMPLETE] Database "${targetDb}" is synchronized.\n`);
  } catch (err: any) {
    console.error(`\n[!] Migration failed: ${err.message}`);
    process.exit(1);
  } finally {
    await appClient.end();
  }
}

runMigrations().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
