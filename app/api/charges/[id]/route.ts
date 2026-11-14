import { NextRequest, NextResponse } from "next/server";
import {
  getChargeById,
  markExpiredIfPending,
  withLazyExpiry,
} from "@/lib/dynamo";
import { jsonError } from "@/lib/errors";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  if (!id) {
    return jsonError(404, "CHARGE_NOT_FOUND", "Unknown charge");
  }

  try {
    const charge = await getChargeById(id);
    if (!charge) {
      return jsonError(404, "CHARGE_NOT_FOUND", "Unknown charge");
    }

    const view = withLazyExpiry(charge);
    if (view.status === "expired" && charge.status === "pending") {
      void markExpiredIfPending(charge.chargeId);
    }

    return NextResponse.json({
      chargeId: view.chargeId,
      status: view.status,
      amount: view.amount,
      concept: view.concept,
      numRef: view.numRef,
      qrString: view.qrString,
      shareUrl: view.shareUrl,
      expiresAt: view.expiresAt,
      paidAt: view.paidAt ?? null,
      transactionId: view.transactionId ?? null,
    });
  } catch (err) {
    console.error("GET /api/charges/[id] failed", err);
    return jsonError(500, "INTERNAL", "Failed to load charge");
  }
}
