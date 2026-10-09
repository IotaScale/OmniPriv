import { redirect } from "next/navigation";

export default function PortalHomePage() {
  // On portal.omnipriv.com, root redirects directly to sign-in or partner workspace
  redirect("/sign-in");
}
