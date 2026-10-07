import { ChannelFeatureFlags } from "./types";

export const DEFAULT_FEATURE_FLAGS: ChannelFeatureFlags = {
  partner_portal: true,
  deals: true,
  leads: true,
  renewals: true,
  trial_requests: true,
  learning: true,
  locator: true,
  marketing_funds: true,
  jbp: true,
  payout_profile: true,
};

export function isFeatureEnabled(
  flag: keyof ChannelFeatureFlags,
  customFlags?: Partial<ChannelFeatureFlags>
): boolean {
  if (customFlags && typeof customFlags[flag] === "boolean") {
    return customFlags[flag]!;
  }
  return DEFAULT_FEATURE_FLAGS[flag] ?? false;
}
