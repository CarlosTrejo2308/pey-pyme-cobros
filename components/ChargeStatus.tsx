"use client";

import { useI18n } from "@/components/I18nProvider";
import type { ChargeStatus as Status } from "@/types/charge";
import type { MsgKey } from "@/lib/i18n";

const LABEL_KEYS: Record<Status, MsgKey> = {
  pending: "stPending",
  paid: "stPaid",
  expired: "stExpired",
};

export function ChargeStatusBadge({ status }: { status: Status }) {
  const { t } = useI18n();
  return (
    <span className={`status-badge status-${status}`} data-status={status}>
      <span className="status-dot" aria-hidden />
      {t(LABEL_KEYS[status])}
    </span>
  );
}
