import { redirect } from "next/navigation";

const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.omnipriv.com";

export default function PortalAdminRedirect() {
  redirect(`${portalUrl}/channel-admin/login`);
}

