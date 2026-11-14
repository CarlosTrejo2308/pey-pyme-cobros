import { Webhook } from "standardwebhooks";

export type WebhookHeaderMap = Record<string, string>;

export function extractWebhookHeaders(
  request: Request,
): { headers: WebhookHeaderMap; missing: string[] } {
  const names = ["webhook-id", "webhook-timestamp", "webhook-signature"] as const;
  const headers: WebhookHeaderMap = {};
  const missing: string[] = [];

  for (const name of names) {
    const value = request.headers.get(name);
    if (!value) {
      missing.push(name);
    } else {
      headers[name] = value;
    }
  }

  return { headers, missing };
}

export function verifyPeyWebhook(
  rawBody: string,
  headers: WebhookHeaderMap,
): unknown {
  const secret = process.env.PEY_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("PEY_WEBHOOK_SECRET is not configured");
  }
  const wh = new Webhook(secret);
  return wh.verify(rawBody, headers);
}
