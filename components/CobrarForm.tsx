"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LupitaAvatar } from "@/components/LupitaAvatar";

function toE164Hint(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (raw.trim().startsWith("+")) return `+${digits}`;
  if (digits.length === 10) return `+52${digits}`;
  if (digits.startsWith("52") && digits.length >= 12) return `+${digits}`;
  return raw.trim().startsWith("+") ? raw.trim() : `+${digits}`;
}

export function CobrarForm({
  initialConcept = "",
  initialAmount = "0.01",
}: {
  initialConcept?: string;
  initialAmount?: string;
}) {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
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

      const wa = toE164Hint(phone);
      const qs = wa ? `?wa=${encodeURIComponent(wa)}` : "";
      router.push(`/c/${data.chargeId}${qs}`);
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
          Dime a quién le cobras y cuánto. Yo creo el QR CoDi real con Pey.
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
          <span>Celular del cliente (opcional, para WhatsApp)</span>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="55 1234 5678 o +525512345678"
            autoComplete="tel"
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
          cobra comisión por cobro.
        </p>
        <button type="submit" className="btn" disabled={busy}>
          {busy ? "Creando cobro…" : "Crear cobro y QR"}
        </button>
      </form>
    </>
  );
}
