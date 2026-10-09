import * as fs from "fs";
import * as path from "path";
import { bootstrapChannelAdmin } from "../lib/partner-portal/bootstrap";

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

async function main() {
  console.log("\n=======================================================");
  console.log("   OmniPriv Channel Admin Server Bootstrap CLI");
  console.log("=======================================================\n");

  try {
    const result = await bootstrapChannelAdmin();
    if (result.executed) {
      console.log(`[SUCCESS] ${result.message}`);
      console.log(`  User ID:  ${result.userId}`);
      console.log(`  Username: ${result.username}`);
      console.log(`  Email:    ${result.email}`);
      console.log(`  Action:   ${result.action}`);
    } else {
      console.log(`[SKIPPED] ${result.message}`);
    }
    console.log("\nOperation completed successfully.\n");
    process.exit(0);
  } catch (err: any) {
    console.error(`\n[FATAL ERROR] Bootstrap failed: ${err.message}\n`);
    process.exit(1);
  }
}

main();
