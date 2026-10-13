/* Support address for /docs, shared by the server page and the client browser. */
export const SUPPORT = "support@OmniPriv.com";
export const ask = (topic: string) => `mailto:${SUPPORT}?subject=${encodeURIComponent(`Docs question: ${topic}`)}`;
