"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { MatiAvatar } from "@/components/MatiAvatar";
import { ChargeStatusBadge } from "@/components/ChargeStatus";
import type { ChargeListItem } from "@/types/charge";

export default function HomePage() {
  const [items, setItems] = useState<ChargeListItem[]>([]);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/charges?limit=5", {
          credentials: "include",
          cache: "no-store",
        });
        if (res.status === 401) {
          if (!cancelled) setLocked(true);
          return;
        }
        if (!res.ok) return;
        const data = (await res.json()) as { items?: ChargeListItem[] };
        if (!cancelled) {
          setItems(data.items ?? []);
          setLocked(false);
        }
      } catch {
        /* home still works without sales preview */
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const paid = items.filter((i) => i.status === "paid");
  const received = paid.reduce((s, i) => s + i.amount, 0);
  const savedApprox = Math.round(received * 0.036 * 1.16 * 100) / 100;

  return (
    <AppShell>
      <p className="demo-strip" role="note">
        <span className="demo-strip-label">Demo</span>
        {locked ? (
          <>
            Primero{" "}
            <Link href="/unlock">desbloquea</Link>, luego{" "}
            <Link href="/cobrar">Cobrar $0.01</Link>.
          </>
        ) : (
          <>
            Empieza en <Link href="/cobrar">Cobrar $0.01</Link> → QR →
            Compartir → <Link href="/sales">Ventas</Link>.
          </>
        )}
      </p>

      <div className="hero-lupita">
        <MatiAvatar size={120} />
        <div className="bubble">
          <strong>¡Hola!</strong> Soy Mati. El camino del pitch es{" "}
          <strong>Cobrar</strong> con un peso de prueba ($0.01), mostrar el QR
          CoDi y compartir el link.
        </div>
      </div>

      <ol className="demo-path" aria-label="Camino del demo">
        <li className={locked ? "demo-step current" : "demo-step done"}>
          {locked ? (
            <Link href="/unlock">
              <b>1. Desbloquear</b>
              <span>Token de la demo</span>
            </Link>
          ) : (
            <>
              <b>1. Desbloquear</b>
              <span>Listo</span>
            </>
          )}
        </li>
        <li className={!locked ? "demo-step current" : "demo-step"}>
          <Link href="/cobrar">
            <b>2. Cobrar $0.01</b>
            <span>QR CoDi real (Pey)</span>
          </Link>
        </li>
        <li className="demo-step">
          <b>3. QR → Compartir</b>
          <span>Muestra o envía el link</span>
        </li>
        <li className="demo-step">
          <Link href="/sales">
            <b>4. Ventas</b>
            <span>Pendiente → Pagado</span>
          </Link>
        </li>
      </ol>

      {locked ? (
        <p className="notice">
          Para crear cobros,{" "}
          <Link href="/unlock">desbloquea la demo</Link> con el token
          compartido.
        </p>
      ) : (
        <div className="money">
          <p className="hint" style={{ marginTop: 0 }}>
            Recibido (últimos cobros cargados)
          </p>
          <p className="big">
            $
            {received.toLocaleString("es-MX", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="hint">
            Comisiones que NO pagaste (ejemplo vs 3.6% + IVA): $
            {savedApprox.toFixed(2)}
          </p>
        </div>
      )}

      <div className="cta-stack">
        {locked ? (
          <Link href="/unlock" className="btn cta-primary">
            Desbloquear demo
          </Link>
        ) : (
          <Link href="/cobrar" className="btn cta-primary">
            Cobrar $0.01
          </Link>
        )}
        <div className="p0-row">
          <Link
            href="/cobrar"
            className="tile tile-p0"
            style={{ background: "#0B6B4F" }}
          >
            <span className="tile-icon" aria-hidden>
              💵
            </span>
            <b>Cobrar</b>
            <span>QR CoDi + compartir</span>
          </Link>
          <Link
            href="/sales"
            className="tile tile-p0"
            style={{ background: "#6B3FA0" }}
          >
            <span className="tile-icon" aria-hidden>
              📋
            </span>
            <b>Ventas</b>
            <span>Cobros reales</span>
          </Link>
        </div>
      </div>

      <details className="stub-fold">
        <summary>
          Más ideas (demo de visión · no mueve dinero)
        </summary>
        <p className="hint section-label" style={{ marginTop: "0.65rem" }}>
          Opcional para jueces: prototipos. El pitch real es Cobrar → QR →
          Compartir → Ventas.
        </p>
        <div className="grid2 stub-grid">
          <Link href="/pagar" className="tile tile-stub" style={{ background: "#1F5FA8" }}>
            <span className="tile-icon" aria-hidden>
              📤
            </span>
            <b>Pagar</b>
            <span>Demo · no mueve $</span>
          </Link>
          <Link
            href="/recurrentes"
            className="tile tile-stub"
            style={{ background: "#3F4FA0" }}
          >
            <span className="tile-icon" aria-hidden>
              📅
            </span>
            <b>Mensuales</b>
            <span>Demo · no mueve $</span>
          </Link>
          <Link
            href="/asistente"
            className="tile tile-stub"
            style={{ background: "#B34E0A" }}
          >
            <span className="tile-icon" aria-hidden>
              💬
            </span>
            <b>Mati</b>
            <span>Asistente (demo)</span>
          </Link>
          <Link
            href="/catalogo"
            className="tile tile-stub"
            style={{ background: "#0E6E7E" }}
          >
            <span className="tile-icon" aria-hidden>
              🛍️
            </span>
            <b>Catálogo</b>
            <span>Demo · precios</span>
          </Link>
        </div>
      </details>

      {!locked && items.length > 0 ? (
        <section className="card">
          <div className="greca" aria-hidden />
          <h3>Mis cobros recientes</h3>
          <ul className="sales-list">
            {items.map((item) => (
              <li key={item.chargeId}>
                <Link href={`/c/${item.chargeId}`} className="sales-row">
                  <div>
                    <p className="sales-amount">${item.amount.toFixed(2)}</p>
                    <p className="sales-concept">{item.concept}</p>
                  </div>
                  <ChargeStatusBadge status={item.status} />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/sales" className="btn alt sm">
            Ver todas las ventas
          </Link>
        </section>
      ) : null}

      <section className="orgullo" aria-label="Hecho con cariño en México">
        <span style={{ fontSize: "2.4rem" }} aria-hidden>
          🇲🇽
        </span>
        <div>
          <p>
            <strong>Hecho con cariño en México</strong>
          </p>
          <p className="hint">
            Para PyMEs de todos los giros. Sello decorativo de CobroLibre (no es
            el distintivo oficial). Powered by Pey CoDi.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
