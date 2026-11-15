"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ChargeStatusBadge } from "@/components/ChargeStatus";
import { QrDisplay } from "@/components/QrDisplay";
import { ShareChargeActions } from "@/components/ShareChargeActions";
import { WhatsAppSendForm } from "@/components/WhatsAppSendForm";
import { useI18n } from "@/components/I18nProvider";
import type { ChargePublic, ChargeStatus } from "@/types/charge";

const POLL_MS = 2000;

function ChargeInner() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const { t } = useI18n();
  const id = params.id;
  const initialWa = search.get("wa") || "";
  const [charge, setCharge] = useState<ChargePublic | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCharge = useCallback(async () => {
    const res = await fetch(`/api/charges/${id}`, { cache: "no-store" });
    if (res.status === 404) {
      setError(t("errNotFound"));
      setCharge(null);
      return null;
    }
    if (!res.ok) {
      setError(t("errLoad"));
      return null;
    }
    const data = (await res.json()) as ChargePublic;
    setCharge(data);
    setError(null);
    return data;
  }, [id, t]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function tick() {
      const data = await fetchCharge();
      if (cancelled || !data) return;

      const status = data.status as ChargeStatus;
      if (status !== "pending") return;

      const remaining = data.expiresAt - Date.now() + 5000;
      if (remaining <= 0) {
        await fetchCharge();
        return;
      }

      timer = setTimeout(tick, Math.min(POLL_MS, remaining));
    }

    void tick();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [fetchCharge]);

  const isPaid = charge?.status === "paid";
  const isPending = charge?.status === "pending";
  const isExpired = charge?.status === "expired";

  return (
    <AppShell subtitleKey="subCharge">
      {error ? (
        <section className="card">
          <p className="form-error">{error}</p>
          <Link href="/cobrar" className="btn">
            {t("newCharge")}
          </Link>
        </section>
      ) : !charge ? (
        <section className="card">
          <p className="pulse">{t("loadingCharge")}</p>
        </section>
      ) : (
        <section className={`card charge-card ${isPaid ? "is-paid" : ""}`}>
          <div className="greca" aria-hidden />

          {isPaid ? (
            <div className="state-banner state-paid" role="status">
              <span className="state-banner-title">{t("paidBanner")}</span>
              <span>{t("paidBannerSub")}</span>
            </div>
          ) : isExpired ? (
            <div className="state-banner state-expired" role="status">
              <span className="state-banner-title">{t("expiredBanner")}</span>
              <span>{t("expiredBannerSub")}</span>
            </div>
          ) : (
            <div className="state-banner state-pending" role="status">
              <span className="state-banner-title">{t("pendingBanner")}</span>
              <span>{t("pendingBannerSub")}</span>
            </div>
          )}

          <div className="charge-head">
            <p className="hint" style={{ margin: 0 }}>
              {isPaid ? t("chargeClosed") : t("showOrShare")}
            </p>
            <ChargeStatusBadge status={charge.status} />
          </div>

          <h1 className="amount">
            ${charge.amount.toFixed(2)}{" "}
            <span className="currency">MXN</span>
          </h1>
          <p className="concept concept-strong">{charge.concept}</p>

          <div className={`qr-wrap ${isPaid ? "paid" : ""}`}>
            <QrDisplay
              qrString={charge.qrString}
              size={300}
              showDownload={isPending || isPaid}
              downloadName={`cobro-${charge.chargeId.slice(0, 8)}`}
            />
            {isPaid ? (
              <div className="paid-overlay" aria-hidden>
                {t("paidBanner")}
              </div>
            ) : null}
          </div>

          {isPending ? <p className="poll-hint">{t("pollHint")}</p> : null}
          {isExpired ? (
            <p className="form-error">{t("expiredMsg")}</p>
          ) : null}
          {isPaid ? (
            <p className="form-ok" role="status">
              {t("paidOk")}
            </p>
          ) : null}

          {isPending ? (
            <ShareChargeActions
              shareUrl={charge.shareUrl}
              amount={charge.amount}
              concept={charge.concept}
            />
          ) : (
            <div className="actions">
              <Link href="/cobrar" className="btn">
                {t("newCharge")}
              </Link>
              <Link href="/sales" className="btn alt">
                {t("seeSales")}
              </Link>
            </div>
          )}

          {isPending ? (
            <>
              <div className="actions" style={{ marginTop: "0.75rem" }}>
                <Link href="/cobrar" className="btn alt">
                  {t("otherCharge")}
                </Link>
                <Link href="/sales" className="btn alt">
                  {t("nVentas")}
                </Link>
              </div>
              <WhatsAppSendForm
                chargeId={charge.chargeId}
                initialTo={initialWa}
              />
            </>
          ) : null}
        </section>
      )}
    </AppShell>
  );
}

export default function ChargePage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <p className="pulse">…</p>
        </AppShell>
      }
    >
      <ChargeInner />
    </Suspense>
  );
}
