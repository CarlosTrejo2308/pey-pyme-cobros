/** Absolute share URL for a charge page. APP_BASE_URL has no trailing slash. */
export function buildShareUrl(chargeId: string, baseUrl?: string): string {
  const base = (baseUrl ?? process.env.APP_BASE_URL ?? "").replace(/\/$/, "");
  if (!base) {
    return `/c/${chargeId}`;
  }
  return `${base}/c/${chargeId}`;
}

export function resolveAppBaseUrl(request: Request): string {
  const fromEnv = process.env.APP_BASE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}
