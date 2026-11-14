import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedRequest, unauthorizedResponse } from "@/lib/auth";
import {
  getChargeById,
  listRecentCharges,
  markExpiredIfPending,
  merchantGsiKeys,
  peyQrGsiKeys,
  putCharge,
  withLazyExpiry,
} from "@/lib/dynamo";
import { jsonError } from "@/lib/errors";
import { newChargeId } from "@/lib/ids";
import { createCodiQr, PEY_QR_EXPIRATION_SECONDS, PeyApiError } from "@/lib/pey";
import { buildShareUrl, resolveAppBaseUrl } from "@/lib/share";
import type { ChargeRecord } from "@/types/charge";

const NUM_REF_RE = /^[0-9]{1,7}$/;

export async function GET(request: NextRequest) {
  if (!isAuthorizedRequest(request)) {
    return unauthorizedResponse();
  }

  const { searchParams } = new URL(request.url);
  const rawLimit = searchParams.get("limit");
  let limit = 20;
  if (rawLimit != null) {
    const parsed = Number.parseInt(rawLimit, 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
      return jsonError(400, "VALIDATION", "limit must be a positive integer");
    }
    limit = Math.min(parsed, 50);
  }

  try {
    const items = await listRecentCharges(limit);
    const normalized = await Promise.all(
      items.map(async (item) => {
        if (item.status !== "pending") return item;
        const full = await getChargeById(item.chargeId);
        if (!full) return item;
        const expired = withLazyExpiry(full);
        if (expired.status === "expired" && full.status === "pending") {
          void markExpiredIfPending(full.chargeId);
        }
        return {
          ...item,
          status: expired.status,
          paidAt: expired.paidAt ?? null,
        };
      }),
    );
    return NextResponse.json({ items: normalized });
  } catch (err) {
    console.error("GET /api/charges failed", err);
    return jsonError(500, "INTERNAL", "Failed to list charges");
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorizedRequest(request)) {
    return unauthorizedResponse();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError(400, "VALIDATION", "Invalid JSON body");
  }

  const record = body as {
    amount?: unknown;
    concept?: unknown;
    numRef?: unknown;
  };

  const amount =
    typeof record.amount === "number"
      ? record.amount
      : typeof record.amount === "string"
        ? Number(record.amount)
        : NaN;

  if (!Number.isFinite(amount) || amount < 0.01) {
    return jsonError(400, "VALIDATION", "amount must be a number >= 0.01");
  }

  if (typeof record.concept !== "string" || !record.concept.trim()) {
    return jsonError(400, "VALIDATION", "concept is required");
  }
  const concept = record.concept.trim();
  if (concept.length > 120) {
    return jsonError(400, "VALIDATION", "concept must be at most 120 characters");
  }

  let numRef = "0";
  if (record.numRef !== undefined && record.numRef !== null && record.numRef !== "") {
    if (typeof record.numRef !== "string" || !NUM_REF_RE.test(record.numRef)) {
      return jsonError(
        400,
        "VALIDATION",
        "numRef must be 1–7 digits when provided",
      );
    }
    numRef = record.numRef;
  }

  const chargeId = newChargeId();
  const createdAt = new Date().toISOString();
  const expiresAt = Date.now() + PEY_QR_EXPIRATION_SECONDS * 1000;
  const baseUrl = resolveAppBaseUrl(request);
  const shareUrl = buildShareUrl(chargeId, baseUrl);

  let pey: { id: string; qrString: string };
  try {
    pey = await createCodiQr({
      amount,
      concept,
      numRef,
      chargeId,
    });
  } catch (err) {
    if (err instanceof PeyApiError) {
      console.error("Pey create QR failed", err.message, err.peyType);
      return jsonError(
        502,
        "PEY_ERROR",
        err.peyType ? `${err.peyType}: ${err.message}` : err.message,
      );
    }
    console.error("Pey create unexpected error", err);
    return jsonError(502, "PEY_ERROR", "Failed to create CoDi QR");
  }

  const item: ChargeRecord = {
    chargeId,
    merchantId: "demo",
    amount,
    concept,
    numRef,
    status: "pending",
    peyCodiQrId: pey.id,
    qrString: pey.qrString,
    shareUrl,
    expirationSeconds: PEY_QR_EXPIRATION_SECONDS,
    expiresAt,
    createdAt,
    paidAt: null,
    transactionId: null,
    ...merchantGsiKeys(chargeId, createdAt),
    ...peyQrGsiKeys(pey.id),
  };

  try {
    await putCharge(item);
  } catch (err) {
    console.error("PutItem charge failed", err);
    return jsonError(500, "INTERNAL", "Failed to persist charge");
  }

  return NextResponse.json(
    {
      chargeId: item.chargeId,
      status: item.status,
      amount: item.amount,
      concept: item.concept,
      numRef: item.numRef,
      qrString: item.qrString,
      peyCodiQrId: item.peyCodiQrId,
      shareUrl: item.shareUrl,
      expiresAt: item.expiresAt,
      createdAt: item.createdAt,
    },
    { status: 201 },
  );
}
