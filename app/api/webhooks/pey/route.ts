import { NextResponse } from "next/server";
import {
  applyPaymentWebhook,
  findChargeByPeyCodiQrId,
} from "@/lib/dynamo";
import { jsonError } from "@/lib/errors";
import { extractWebhookHeaders, verifyPeyWebhook } from "@/lib/webhooks";

export const runtime = "nodejs";

interface PeyPaymentEvent {
  type?: string;
  codiQrId?: string;
  transactionId?: string;
  amount?: number;
  concept?: string;
  numRef?: string;
  datePaid?: number;
  apiKeyId?: string;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const { headers, missing } = extractWebhookHeaders(request);

  if (missing.length > 0) {
    return jsonError(
      400,
      "MISSING_SIGNATURE",
      `Missing headers: ${missing.join(", ")}`,
    );
  }

  try {
    verifyPeyWebhook(rawBody, headers);
  } catch (err) {
    console.error("Pey webhook signature verify failed", err);
    return jsonError(401, "INVALID_SIGNATURE", "Webhook signature invalid or expired");
  }

  let event: PeyPaymentEvent;
  try {
    event = JSON.parse(rawBody) as PeyPaymentEvent;
  } catch {
    return jsonError(400, "VALIDATION", "Invalid JSON body");
  }

  if (event.type !== "codi.qr.payment_received") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const codiQrId = event.codiQrId;
  if (!codiQrId || typeof codiQrId !== "string") {
    return jsonError(400, "VALIDATION", "codiQrId is required");
  }

  const webhookId = headers["webhook-id"];
  const transactionId =
    typeof event.transactionId === "string" ? event.transactionId : "";

  try {
    const charge = await findChargeByPeyCodiQrId(codiQrId);
    if (!charge) {
      console.error("Webhook charge not found for codiQrId", codiQrId);
      return jsonError(404, "CHARGE_NOT_FOUND", "No charge for codiQrId");
    }

    const processed = new Set(charge.processedWebhookIds ?? []);
    const alreadyProcessed = processed.has(webhookId);
    const alreadyPaid = charge.status === "paid";

    const paidAtIso =
      typeof event.datePaid === "number"
        ? new Date(event.datePaid * 1000).toISOString()
        : new Date().toISOString();

    const result = await applyPaymentWebhook({
      chargeId: charge.chargeId,
      webhookId,
      transactionId: transactionId || charge.transactionId || "unknown",
      paidAtIso: charge.paidAt || paidAtIso,
      alreadyPaid,
      alreadyProcessed,
    });

    if (result === "deduped") {
      return NextResponse.json({ ok: true, deduped: true });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Pey webhook processing failed", err);
    return jsonError(500, "INTERNAL", "Failed to process webhook");
  }
}
