import crypto from "crypto";

/**
 * Enterprise Cryptographic Password Hasher for OmniPriv
 * Uses Node.js crypto.scrypt with a 16-byte cryptographically secure random salt.
 * Output format: scrypt:v1:<salt_hex>:<derived_key_hex>
 */

const SCRYPT_KEYLEN = 64;
const SCRYPT_COST = 16384; // N
const SCRYPT_BLOCK_SIZE = 8; // r
const SCRYPT_PARALLELIZATION = 1; // p

/**
 * Generates a secure salted scrypt password hash.
 * Never stores plaintext passwords.
 */
export async function hashPassword(password: string): Promise<string> {
  if (!password || typeof password !== "string") {
    throw new Error("Password must be a non-empty string.");
  }

  const salt = crypto.randomBytes(16).toString("hex");

  return new Promise((resolve, reject) => {
    crypto.scrypt(
      password,
      salt,
      SCRYPT_KEYLEN,
      {
        N: SCRYPT_COST,
        r: SCRYPT_BLOCK_SIZE,
        p: SCRYPT_PARALLELIZATION,
        maxmem: 32 * 1024 * 1024,
      },
      (err, derivedKey) => {
        if (err) return reject(err);
        resolve(`scrypt:v1:${salt}:${derivedKey.toString("hex")}`);
      }
    );
  });
}

/**
 * Verifies a plaintext password against a stored scrypt hash using timingSafeEqual
 * to prevent timing side-channel attacks.
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  if (!password || !storedHash) return false;

  const parts = storedHash.split(":");
  if (parts.length !== 4 || parts[0] !== "scrypt" || parts[1] !== "v1") {
    // Unsupported or malformed hash format
    return false;
  }

  const salt = parts[2];
  const originalKeyHex = parts[3];
  const originalKey = Buffer.from(originalKeyHex, "hex");

  return new Promise((resolve) => {
    crypto.scrypt(
      password,
      salt,
      originalKey.length,
      {
        N: SCRYPT_COST,
        r: SCRYPT_BLOCK_SIZE,
        p: SCRYPT_PARALLELIZATION,
        maxmem: 32 * 1024 * 1024,
      },
      (err, derivedKey) => {
        if (err) return resolve(false);
        try {
          // Constant-time buffer comparison to prevent timing analysis
          const matches = crypto.timingSafeEqual(originalKey, derivedKey);
          resolve(matches);
        } catch {
          resolve(false);
        }
      }
    );
  });
}
