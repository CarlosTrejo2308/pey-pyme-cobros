import twilio from "twilio";

/**
 * Post-trial ContentVariables map (amount, concept, shareUrl).
 * Not sent in P0 — Twilio WhatsApp trial only allows To/From/ContentSid.
 * Gate later with TWILIO_CONTENT_VARIABLES=1.
 */
export const POST_TRIAL_CONTENT_VARIABLES_KEYS = {
  amount: "1",
  concept: "2",
  shareUrl: "3",
} as const;

export function buildPostTrialContentVariables(input: {
  amount: number;
  concept: string;
  shareUrl: string;
}): Record<string, string> {
  return {
    [POST_TRIAL_CONTENT_VARIABLES_KEYS.amount]: input.amount.toFixed(2),
    [POST_TRIAL_CONTENT_VARIABLES_KEYS.concept]: input.concept,
    [POST_TRIAL_CONTENT_VARIABLES_KEYS.shareUrl]: input.shareUrl,
  };
}

export class TwilioSendError extends Error {
  readonly status: number;
  readonly twilioCode?: number | string;

  constructor(message: string, status = 502, twilioCode?: number | string) {
    super(message);
    this.name = "TwilioSendError";
    this.status = status;
    this.twilioCode = twilioCode;
  }
}

const E164_RE = /^\+[1-9]\d{6,14}$/;

export function isValidE164(toE164: string): boolean {
  return E164_RE.test(toE164);
}

export async function sendWhatsAppTrial(toE164: string): Promise<{
  sid: string;
  to: string;
}> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const contentSid = process.env.TWILIO_WHATSAPP_CONTENT_SID;

  if (!accountSid || !authToken || !from || !contentSid) {
    throw new TwilioSendError("Twilio WhatsApp env is incomplete", 500);
  }

  if (!isValidE164(toE164)) {
    throw new TwilioSendError("Invalid E.164 phone number", 400);
  }

  const to = `whatsapp:${toE164}`;
  const client = twilio(accountSid, authToken);

  try {
    const params: {
      to: string;
      from: string;
      contentSid: string;
      contentVariables?: string;
    } = {
      to,
      from,
      contentSid,
    };

    // Default off for P0 trial. Enable only after custom templates support vars.
    if (process.env.TWILIO_CONTENT_VARIABLES === "1") {
      // Caller should not rely on this in P0; placeholder for post-trial.
      params.contentVariables = JSON.stringify({});
    }

    const message = await client.messages.create(params);
    if (!message.sid) {
      throw new TwilioSendError("Twilio accepted but returned no SID");
    }
    return { sid: message.sid, to };
  } catch (err) {
    if (err instanceof TwilioSendError) throw err;
    const anyErr = err as { message?: string; status?: number; code?: number };
    throw new TwilioSendError(
      anyErr.message || "Twilio Messages API error",
      502,
      anyErr.code,
    );
  }
}
