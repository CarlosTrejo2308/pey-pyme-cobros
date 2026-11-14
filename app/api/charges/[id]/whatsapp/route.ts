import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedRequest, unauthorizedResponse } from "@/lib/auth";
import { getChargeById, withLazyExpiry } from "@/lib/dynamo";
import { jsonError } from "@/lib/errors";
import {
  isValidE164,
  sendWhatsAppTrial,
  TwilioSendError,
} from "@/lib/twilio";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  if (!isAuthorizedRequest(request)) {
    return unauthorizedResponse();
  }

  const { id } = await context.params;
  if (!id) {
    return jsonError(404, "CHARGE_NOT_FOUND", "Unknown charge");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "VALIDATION", "Invalid JSON body");
  }

  const toE164 =
    typeof (body as { toE164?: unknown }).toE164 === "string"
      ? (body as { toE164: string }).toE164.trim()
      : "";

  if (!isValidE164(toE164)) {
    return jsonError(400, "VALIDATION", "toE164 must be a valid E.164 number");
  }

  try {
    const charge = await getChargeById(id);
    if (!charge) {
      return jsonError(404, "CHARGE_NOT_FOUND", "Unknown charge");
    }

    const view = withLazyExpiry(charge);
    if (view.status !== "pending") {
      return jsonError(
        400,
        "VALIDATION",
        `Charge is ${view.status}; WhatsApp send requires pending`,
      );
    }

    const result = await sendWhatsAppTrial(toE164);
    return NextResponse.json({
      ok: true,
      twilioSid: result.sid,
      to: result.to,
    });
  } catch (err) {
    if (err instanceof TwilioSendError) {
      if (err.status === 400) {
        return jsonError(400, "VALIDATION", err.message);
      }
      console.error("Twilio send failed", err.message, err.twilioCode);
      return jsonError(502, "TWILIO_ERROR", err.message);
    }
    console.error("POST whatsapp unexpected", err);
    return jsonError(500, "INTERNAL", "Failed to send WhatsApp");
  }
}
