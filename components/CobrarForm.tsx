"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LupitaAvatar } from "@/components/LupitaAvatar";

export function CobrarForm({
  initialConcept = "",
  initialAmount = "0.01",
}: {
  initialConcept?: string;
  initialAmount?: string;
}) {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState(initialAmount);
  const [concept, setConcept] = useState(initialConcept || "Demo cobro");
  const [numRef, setNumRef] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const parsedAmount = Number(amount);
    const why = concept.trim();
    const who = clientName.trim();
    const fullConcept = who ? `${who} · ${why}` : why;

    const body: { amount: number; concept: string; numRef?: string } = {
      amount: parsedAmount,
      concept: fullConcept.slice(0, 120),
    };
    if (numRef.trim()) {
      body.numRef = numRef.trim();
    }

    try {
      const res = await fetch("/api/charges", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as {
        chargeId?: string;
        error?: { message?: string; code?: string };
      };

      if (res.status === 401) {
        router.push("/unlock");
        return;
      }
      if (!res.ok || !data.chargeId) {
        setError(data.error?.message || "No se pudo crear el cobro");
        return;
      }

      router.push(`/c/${data.chargeId}`);
    } catch {
      setError("Error de red al crear el cobro");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="guide">
        <LupitaAvatar size={68} crop />
        <div className="bubble">
          Dime a quién le cobras y cuánto. Yo creo el QR CoDi real con Pey; luego
          lo compartes desde tu teléfono.
        </div>
      </div>

      <form className="cobrar-form" onSubmit={onSubmit}>
        <label className="field">
          <span>Nombre del cliente (opcional)</span>
          <input
            type="text"
            name="clientName"
            maxLength={60}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ana López"
            autoComplete="name"
          />
        </label>
        <label className="field">
          <span>Monto en pesos (MXN)</span>
          <input
            type="number"
            name="amount"
            min={0.01}
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>¿Por qué es el cobro?</span>
          <input
            type="text"
            name="concept"
            maxLength={120}
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Referencia (opcional, máx. 7 dígitos)</span>
          <input
            type="text"
            name="numRef"
            inputMode="numeric"
            pattern="[0-9]{0,7}"
            maxLength={7}
            value={numRef}
            onChange={(e) =>
              setNumRef(e.target.value.replace(/\D/g, "").slice(0, 7))
            }
          />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <p className="hint">
          El dinero llega a tu cuenta por CoDi. CobroLibre no retiene fondos ni
          cobra comisión por cobro. En la siguiente pantalla compartes el link o
          muestras el QR.
        </p>
        <button type="submit" className="btn" disabled={busy}>
          {busy ? "Creando cobro…" : "Crear cobro y QR"}
        </button>
      </form>
    </>
  );
}
