import type { Metadata } from "next";

import IdentitySwitcher from "@/components/home/identity/IdentitySwitcher";

/*
 * Temporary comparison page: Zero standing privilege options for the
 * right-hand side of the identity switcher. Not linked and not indexed.
 */
export const metadata: Metadata = {
  title: "Zero standing privilege options (preview)",
  robots: { index: false, follow: false },
};

function Label({ name, note }: { name: string; note: string }) {
  return (
    <div className="container-xl pt-10">
      <div className="rounded-xl border border-dashed border-[#00B8DB]/50 bg-[#00B8DB]/[0.06] px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
        <span className="font-semibold text-[#00667A] dark:text-[#00B8DB]">{name}.</span> {note}
      </div>
    </div>
  );
}

export default function IdentityAnimationPreview() {
  return (
    <div className="op-home">
      <Label
        name="1. Zero standing privilege (improved timeline)"
        note="A working day from 09:00 to 17:00 with a live clock. The standing bar fills with the playhead and never stops. On the OmniPriv row each window opens on request, counts down, then closes and the credential rotates. The AI agent row shows a held and a blocked call. Below, the exposure bars count up side by side."
      />
      <IdentitySwitcher visual="zsp2" />
      <Label
        name="2. 24-hour access clock"
        note="A clock face for one day. As the hand sweeps, the outer red ring (standing access) follows it all the way round, while the inner ring only lights up for the short grants OmniPriv issued. The totals on the side compare the two."
      />
      <IdentitySwitcher visual="zclock" />
      <Label
        name="3. Credentials that expire"
        note="Left: a standing credential that keeps ageing, is known by several people and never expires. Right: OmniPriv issues short-lived credentials one at a time, each with its time-to-live bar, and they drop into the history as expired, held or blocked. It ends on: nothing left to steal."
      />
      <IdentitySwitcher visual="ztokens" />
      <Label
        name="4. A week of access"
        note="Seven days by 24 hours. First every hour turns red, because standing access is always on. Then a sweep clears the grid and only the hours with an approved grant stay lit. The counter drops from 168 hours to the real total."
      />
      <IdentitySwitcher visual="zweek" />
      <div className="h-16" />
    </div>
  );
}
