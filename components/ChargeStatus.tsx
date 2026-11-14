"use client";

import type { ChargeStatus as Status } from "@/types/charge";

const LABELS: Record<Status, string> = {
  pending: "Pendiente",
  paid: "Pagado",
  expired: "Expirado",
};

export function ChargeStatusBadge({ status }: { status: Status }) {
  return (
    <span className={`status-badge status-${status}`} data-status={status}>
      <span className="status-dot" aria-hidden />
      {LABELS[status]}
    </span>
  );
}
