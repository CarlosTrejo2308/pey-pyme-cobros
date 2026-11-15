"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ChargeStatusBadge } from "@/components/ChargeStatus";
import type { ChargeListItem } from "@/types/charge";

export default function SalesPage() {
  const router = useRouter();
  const [items, setItems] = useState<ChargeListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/charges?limit=20", {
          credentials: "include",
          cache: "no-store",
        });
        if (res.status === 401) {
          router.push("/unlock");
          return;
        }
        const data = (await res.json()) as {
          items?: ChargeListItem[];
          error?: { message?: string };
        };
        if (!res.ok) {
          if (!cancelled) {
            setError(data.error?.message || "No se pudo cargar ventas");
          }
          return;
        }
        if (!cancelled) {
          setItems(data.items ?? []);
          setError(null);
        }
      } catch {
        if (!cancelled) setError("Error de red");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <AppShell subtitle="Ventas">
      <section className="card">
        <div className="greca" aria-hidden />
        <h2>Mis cobros</h2>
        <p className="hint">
          Lista real desde DynamoDB. El estado Pagado llega por webhook Pey.
        </p>

        {loading ? <p className="pulse">Cargando…</p> : null}
        {error ? <p className="form-error">{error}</p> : null}

        {!loading && !error && items.length === 0 ? (
          <p className="hint">Aún no hay cobros. Crea el primero.</p>
        ) : null}

        <ul className="sales-list">
          {items.map((item) => (
            <li key={item.chargeId}>
              <Link href={`/c/${item.chargeId}`} className="sales-row">
                <div>
                  <p className="sales-amount">${item.amount.toFixed(2)}</p>
                  <p className="sales-concept">{item.concept}</p>
                  <p className="sales-meta">
                    {new Date(item.createdAt).toLocaleString("es-MX")}
                  </p>
                </div>
                <ChargeStatusBadge status={item.status} />
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/cobrar" className="btn" style={{ marginTop: 12 }}>
          Nuevo cobro
        </Link>
      </section>
    </AppShell>
  );
}
