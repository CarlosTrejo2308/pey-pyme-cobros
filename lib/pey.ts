const PEY_QR_URL = "https://api.pey.mx/codi/qr";

export const PEY_QR_EXPIRATION_SECONDS = 900;

export interface CreatePeyQrInput {
  amount: number;
  concept: string;
  numRef: string;
  chargeId: string;
}

export interface CreatePeyQrResult {
  id: string;
  qrString: string;
}

export class PeyApiError extends Error {
  readonly status: number;
  readonly peyType?: string;

  constructor(message: string, status: number, peyType?: string) {
    super(message);
    this.name = "PeyApiError";
    this.status = status;
    this.peyType = peyType;
  }
}

export async function createCodiQr(
  input: CreatePeyQrInput,
): Promise<CreatePeyQrResult> {
  const apiKey = process.env.PEY_API_KEY;
  if (!apiKey) {
    throw new PeyApiError("PEY_API_KEY is not configured", 500);
  }

  const body: Record<string, unknown> = {
    amount: input.amount,
    concept: input.concept,
    expiration: PEY_QR_EXPIRATION_SECONDS,
    numRef: input.numRef,
    generateImage: false,
    metadata: { chargeId: input.chargeId },
  };

  const bankAccountId = process.env.PEY_BANK_ACCOUNT_ID?.trim();
  if (bankAccountId) {
    body.bankAccountId = bankAccountId;
  }

  const res = await fetch(PEY_QR_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  let data: Record<string, unknown> = {};
  try {
    data = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    data = {};
  }

  if (!res.ok) {
    const errObj = data.error as { type?: string; message?: string } | undefined;
    const message =
      errObj?.message ||
      (typeof data.message === "string" ? data.message : null) ||
      `Pey create QR failed (${res.status})`;
    throw new PeyApiError(message, res.status, errObj?.type);
  }

  const id = typeof data.id === "string" ? data.id : null;
  const qrString = typeof data.qrString === "string" ? data.qrString : null;
  if (!id || !qrString) {
    throw new PeyApiError("Pey response missing id or qrString", 502);
  }

  return { id, qrString };
}
