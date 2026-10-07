import { redirect } from "next/navigation";

export default function PortalAdminRedirect() {
  redirect("/channel-admin/login");
}
