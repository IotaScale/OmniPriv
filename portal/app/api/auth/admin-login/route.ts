import { NextRequest } from "next/server";
import { POST as handleSignIn } from "../sign-in/route";

/**
 * Delegating handler ensuring all authentication routes through
 * the unified OmniPriv identity and session engine (/api/auth/sign-in).
 */
export async function POST(request: NextRequest) {
  return handleSignIn(request);
}
