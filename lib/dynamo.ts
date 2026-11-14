import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import type { ChargeListItem, ChargeRecord, ChargeStatus } from "@/types/charge";

const REGION =
  process.env.DYNAMO_AWS_REGION ||
  process.env.AWS_REGION ||
  process.env.AWS_DEFAULT_REGION ||
  "us-east-1";

export function getChargesTableName(): string {
  return process.env.CHARGES_TABLE_NAME || "pey-pyme-charges";
}

/**
 * Amplify Hosting often reserves/blocks AWS_* env names. Prefer standard
 * AWS_* keys when present; otherwise accept DYNAMO_AWS_* aliases.
 * When neither is set, fall through to the default SDK credential chain
 * (local profiles / instance role if ever injected).
 */
function resolveExplicitCredentials():
  | { accessKeyId: string; secretAccessKey: string }
  | undefined {
  const accessKeyId =
    process.env.AWS_ACCESS_KEY_ID || process.env.DYNAMO_AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    process.env.AWS_SECRET_ACCESS_KEY || process.env.DYNAMO_AWS_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    return undefined;
  }
  return { accessKeyId, secretAccessKey };
}

const explicitCredentials = resolveExplicitCredentials();
const baseClient = new DynamoDBClient({
  region: REGION,
  ...(explicitCredentials ? { credentials: explicitCredentials } : {}),
});
export const docClient = DynamoDBDocumentClient.from(baseClient, {
  marshallOptions: { removeUndefinedValues: true },
});

export function merchantGsiKeys(chargeId: string, createdAtIso: string) {
  return {
    gsi1pk: "MERCHANT#demo",
    gsi1sk: `CREATED#${createdAtIso}#${chargeId}`,
  };
}

export function peyQrGsiKeys(peyCodiQrId: string) {
  return {
    gsi2pk: `PEYQR#${peyCodiQrId}`,
    gsi2sk: "CHARGE",
  };
}

export async function putCharge(item: ChargeRecord): Promise<void> {
  // DynamoDB String Sets cannot be empty — omit until first webhook id lands.
  const { processedWebhookIds, ...rest } = item;
  const toPut =
    processedWebhookIds && processedWebhookIds.length > 0
      ? { ...rest, processedWebhookIds }
      : rest;

  await docClient.send(
    new PutCommand({
      TableName: getChargesTableName(),
      Item: toPut,
      ConditionExpression: "attribute_not_exists(chargeId)",
    }),
  );
}

export async function getChargeById(
  chargeId: string,
): Promise<ChargeRecord | null> {
  const res = await docClient.send(
    new GetCommand({
      TableName: getChargesTableName(),
      Key: { chargeId },
    }),
  );
  return (res.Item as ChargeRecord | undefined) ?? null;
}

export async function listRecentCharges(
  limit: number,
): Promise<ChargeListItem[]> {
  const res = await docClient.send(
    new QueryCommand({
      TableName: getChargesTableName(),
      IndexName: "gsi1",
      KeyConditionExpression: "gsi1pk = :pk",
      ExpressionAttributeValues: { ":pk": "MERCHANT#demo" },
      ScanIndexForward: false,
      Limit: limit,
    }),
  );

  return (res.Items ?? []).map((item) => {
    const row = item as ChargeRecord;
    return {
      chargeId: row.chargeId,
      status: row.status,
      amount: row.amount,
      concept: row.concept,
      createdAt: row.createdAt,
      paidAt: row.paidAt ?? null,
    };
  });
}

export async function findChargeByPeyCodiQrId(
  peyCodiQrId: string,
): Promise<ChargeRecord | null> {
  const res = await docClient.send(
    new QueryCommand({
      TableName: getChargesTableName(),
      IndexName: "gsi2",
      KeyConditionExpression: "gsi2pk = :pk AND gsi2sk = :sk",
      ExpressionAttributeValues: {
        ":pk": `PEYQR#${peyCodiQrId}`,
        ":sk": "CHARGE",
      },
      Limit: 1,
    }),
  );
  const item = res.Items?.[0] as ChargeRecord | undefined;
  return item ?? null;
}

/** Best-effort pending → expired when past expiresAt. */
export async function markExpiredIfPending(chargeId: string): Promise<void> {
  try {
    await docClient.send(
      new UpdateCommand({
        TableName: getChargesTableName(),
        Key: { chargeId },
        UpdateExpression: "SET #status = :expired",
        ConditionExpression: "#status = :pending AND expiresAt <= :now",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: {
          ":expired": "expired" satisfies ChargeStatus,
          ":pending": "pending",
          ":now": Date.now(),
        },
      }),
    );
  } catch {
    // Conditional check failed or race — ignore for lazy expiry path
  }
}

export async function applyPaymentWebhook(input: {
  chargeId: string;
  webhookId: string;
  transactionId: string;
  paidAtIso: string;
  alreadyPaid: boolean;
  alreadyProcessed: boolean;
}): Promise<"deduped" | "paid"> {
  const { chargeId, webhookId, transactionId, paidAtIso, alreadyPaid, alreadyProcessed } =
    input;

  if (alreadyProcessed) {
    return "deduped";
  }

  if (alreadyPaid) {
    await docClient.send(
      new UpdateCommand({
        TableName: getChargesTableName(),
        Key: { chargeId },
        UpdateExpression: "ADD processedWebhookIds :wid",
        ExpressionAttributeValues: {
          ":wid": new Set([webhookId]),
        },
      }),
    );
    return "deduped";
  }

  // Settlement wins over expiry: pending or expired → paid
  await docClient.send(
    new UpdateCommand({
      TableName: getChargesTableName(),
      Key: { chargeId },
      UpdateExpression:
        "SET #status = :paid, paidAt = :paidAt, transactionId = :txn ADD processedWebhookIds :wid",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: {
        ":paid": "paid" satisfies ChargeStatus,
        ":paidAt": paidAtIso,
        ":txn": transactionId,
        ":wid": new Set([webhookId]),
      },
    }),
  );
  return "paid";
}

export function withLazyExpiry(charge: ChargeRecord): ChargeRecord {
  if (charge.status === "pending" && Date.now() >= charge.expiresAt) {
    return { ...charge, status: "expired" };
  }
  return charge;
}
