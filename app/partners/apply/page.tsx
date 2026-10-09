import { redirect } from "next/navigation";

export default function PartnerApplyRedirect() {
  const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.omnipriv.com";
  redirect(`${portalUrl}/sign-up`);
}
