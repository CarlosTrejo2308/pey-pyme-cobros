"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ChargeStatusBadge } from "@/components/ChargeStatus";
import { QrDisplay } from "@/components/QrDisplay";
import { WhatsAppSendForm } from "@/components/WhatsAppSendForm";
import type { ChargePublic, ChargeStatus } from "@/types/charge";

const POLL_MS = 2000;

export default function ChargePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
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
      const absolute =
        charge.shareUrl.startsWith("http")
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
    <main className="shell">
      <header className="topbar">
        <Link href="/" className="brand">
          Pey
        </Link>
        <nav className="nav">
          <Link href="/">Cobrar</Link>
          <Link href="/sales">Ventas</Link>
        </nav>
      </header>

      {error ? (
        <section className="panel">
          <p className="form-error">{error}</p>
          <Link href="/" className="btn btn-secondary">
            Nuevo cobro
          </Link>
        </section>
      ) : !charge ? (
        <section className="panel">
          <p className="lede pulse">Cargando cobro…</p>
        </section>
      ) : (
        <section className="panel charge-panel">
          <div className="charge-head">
            <p className="eyebrow">Cobro</p>
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
            <p className="lede poll-hint">
              Esperando pago CoDi… se actualiza cada 2s
            </p>
          ) : null}
          {charge.status === "expired" ? (
            <p className="form-error">Este cobro expiró. Crea uno nuevo.</p>
          ) : null}

          <div className="actions">
            <button type="button" className="btn btn-secondary" onClick={copyShare}>
              {copied ? "Link copiado" : "Copiar link"}
            </button>
            <Link href="/" className="btn btn-ghost">
              Otro cobro
            </Link>
          </div>

          {charge.status === "pending" ? (
            <WhatsAppSendForm chargeId={charge.chargeId} />
          ) : null}
        </section>
      )}
    </main>
  );
}
