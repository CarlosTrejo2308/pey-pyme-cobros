import { ulid } from "ulid";

export function newChargeId(): string {
  return ulid();
}
