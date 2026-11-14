export type ChargeStatus = "pending" | "paid" | "expired";

export interface ChargeRecord {
  chargeId: string;
  merchantId: string;
  amount: number;
  concept: string;
  numRef: string;
  status: ChargeStatus;
  peyCodiQrId: string;
  qrString: string;
  shareUrl: string;
  expirationSeconds: number;
  expiresAt: number;
  createdAt: string;
  paidAt?: string | null;
  transactionId?: string | null;
  processedWebhookIds?: string[];
  gsi1pk: string;
  gsi1sk: string;
  gsi2pk: string;
  gsi2sk: string;
}

export interface ChargePublic {
  chargeId: string;
  status: ChargeStatus;
  amount: number;
  concept: string;
  numRef: string;
  qrString: string;
  shareUrl: string;
  expiresAt: number;
  paidAt: string | null;
  transactionId: string | null;
  createdAt?: string;
  peyCodiQrId?: string;
}

export interface ChargeListItem {
  chargeId: string;
  status: ChargeStatus;
  amount: number;
  concept: string;
  createdAt: string;
  paidAt: string | null;
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
  };
}
