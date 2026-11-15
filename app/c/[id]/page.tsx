"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ChargeStatusBadge } from "@/components/ChargeStatus";
import { QrDisplay } from "@/components/QrDisplay";
import { WhatsAppSendForm } from "@/components/WhatsAppSendForm";
import type { ChargePublic, ChargeStatus } from "@/types/charge";

const POLL_MS = 2000;

function ChargeInner() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const id = params.id;
  const initialWa = search.get("wa") || "";
  const [charge, setCharge] = useState<ChargePublic | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchCharge = useCallback(async () => {
    const res = await fetch(`/api/charges/${id}`, { cache: "no-store" });
    if (res.status === 404) {
      setError("Cobro no encontrado");
      setCharge(null);
      return null;
    }
    if (!res.ok) {
      setError("No se pudo cargar el cobro");
      return null;
    }
    const data = (await res.json()) as ChargePublic;
    setCharge(data);
    setError(null);
    return data;
  }, [id]);

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

  async function copyShare() {
    if (!charge?.shareUrl) return;
    try {
      const absolute = charge.shareUrl.startsWith("http")
        ? charge.shareUrl
        : `${window.location.origin}${charge.shareUrl}`;
      await navigator.clipboard.writeText(absolute);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <AppShell subtitle="Cobro CoDi">
      {error ? (
        <section className="card">
          <p className="form-error">{error}</p>
          <Link href="/cobrar" className="btn">
            Nuevo cobro
          </Link>
        </section>
      ) : !charge ? (
        <section className="card">
          <p className="pulse">Cargando cobro…</p>
        </section>
      ) : (
        <section className="card">
          <div className="greca" aria-hidden />
          <div className="charge-head">
            <p className="hint" style={{ margin: 0 }}>
              Cobro listo
            </p>
            <ChargeStatusBadge status={charge.status} />
          </div>
          <h1 className="amount">
            ${charge.amount.toFixed(2)}{" "}
            <span className="currency">MXN</span>
          </h1>
          <p className="concept">{charge.concept}</p>

          <div className={`qr-wrap ${charge.status === "paid" ? "paid" : ""}`}>
            <QrDisplay qrString={charge.qrString} />
            {charge.status === "paid" ? (
              <div className="paid-overlay" role="status">
                Pagado
              </div>
            ) : null}
          </div>

          {charge.status === "pending" ? (
            <p className="poll-hint">
              Esperando pago CoDi… se actualiza cada 2s vía webhook Pey
            </p>
          ) : null}
          {charge.status === "expired" ? (
            <p className="form-error">Este cobro expiró. Crea uno nuevo.</p>
          ) : null}
          {charge.status === "paid" ? (
            <p className="form-ok" role="status">
              ¡Pago recibido! Sin comisiones de CobroLibre.
            </p>
          ) : null}

          <div className="actions">
            <button type="button" className="btn alt" onClick={copyShare}>
              {copied ? "Link copiado" : "Copiar link"}
            </button>
            <Link href="/cobrar" className="btn alt">
              Otro cobro
            </Link>
          </div>

          {charge.status === "pending" ? (
            <WhatsAppSendForm
              chargeId={charge.chargeId}
              initialTo={initialWa}
            />
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
          <p className="pulse">Cargando…</p>
        </AppShell>
      }
    >
      <ChargeInner />
    </Suspense>
  );
}
