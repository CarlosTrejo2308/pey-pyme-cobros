"use client";

import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DemoStub } from "@/components/DemoStub";

const CONTACTS = [
  { name: "Don Pedro", role: "Proveedor de telas", color: "#0B6B4F" },
  { name: "Ana López", role: "Empleada", color: "#1F5FA8" },
  { name: "Casa Sol", role: "Renta del local", color: "#B34E0A" },
  { name: "Lupe", role: "Gas y servicios", color: "#6B3FA0" },
];

export default function PagarPage() {
  const [mode, setMode] = useState<"home" | "scan" | "confirm">("home");
  const [draft, setDraft] = useState<{
    to: string;
    amount: number;
    note: string;
  } | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  function pickContact(name: string, role: string) {
    setDraft({ to: name, amount: 200, note: role });
    setMode("confirm");
  }

  function confirmPay() {
    if (!draft) return;
    setSent(`Simulaste pagar $${draft.amount.toFixed(2)} a ${draft.to}.`);
    setDraft(null);
    setMode("home");
  }

  return (
    <AppShell subtitle="Pagar (demo)">
      <DemoStub title="Pagar a proveedores">
        <p className="hint">
          Flujo inspirado en CobroLibre / Venmo: siempre confirmar antes de
          enviar. Aquí no hay SPEI de salida real.
        </p>

        {sent ? (
          <p className="form-ok" role="status">
            {sent}
          </p>
        ) : null}

        {mode === "home" ? (
          <>
            <div className="money">
              <p className="hint" style={{ marginTop: 0 }}>
                Tu saldo (demostración)
              </p>
              <p className="big">$3,000.00</p>
            </div>
            <div className="row" style={{ marginBottom: 12 }}>
              <button
                type="button"
                className="btn alt sm"
                onClick={() => setMode("scan")}
              >
                📷 Escanear QR
              </button>
              <button
                type="button"
                className="btn alt sm"
                onClick={() =>
                  pickContact("Pedro (voz)", "Pago por voz demo")
                }
              >
                🎤 Pagar con voz
              </button>
            </div>
            <h3>¿A quién le pagas?</h3>
            <div className="contacts">
              {CONTACTS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className="ct"
                  onClick={() => pickContact(c.name, c.role)}
                >
                  <span className="av" style={{ background: c.color }}>
                    {c.name.charAt(0)}
                  </span>
                  <b>{c.name}</b>
                  <span>{c.role}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {mode === "scan" ? (
          <>
            <div className="viewfinder" aria-hidden>
              <div className="scanline" />
            </div>
            <p className="hint">
              En esta demo no se usa la cámara. Simula una lectura.
            </p>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setDraft({
                  to: "Panadería La Esperanza",
                  amount: 230,
                  note: "Compra",
                });
                setMode("confirm");
              }}
            >
              Simular lectura de QR
            </button>
            <button
              type="button"
              className="btn alt"
              style={{ marginTop: 8 }}
              onClick={() => setMode("home")}
            >
              Cancelar
            </button>
          </>
        ) : null}

        {mode === "confirm" && draft ? (
          <>
            <h3>Vas a pagar</h3>
            <p className="big">${draft.amount.toFixed(2)}</p>
            <p>
              a <strong>{draft.to}</strong>
            </p>
            <p className="hint">{draft.note}</p>
            <p className="notice">
              Revisa nombre y monto. Nunca pagues si alguien te presiona.
            </p>
            <button type="button" className="btn" onClick={confirmPay}>
              Confirmar y pagar (demo)
            </button>
            <button
              type="button"
              className="btn alt"
              style={{ marginTop: 8 }}
              onClick={() => {
                setDraft(null);
                setMode("home");
              }}
            >
              Cancelar
            </button>
          </>
        ) : null}
      </DemoStub>
    </AppShell>
  );
}
