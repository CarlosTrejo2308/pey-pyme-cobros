"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CobrarForm() {
  const router = useRouter();
  const [amount, setAmount] = useState("0.01");
  const [concept, setConcept] = useState("Demo cobro");
  const [numRef, setNumRef] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const parsedAmount = Number(amount);
    const body: { amount: number; concept: string; numRef?: string } = {
      amount: parsedAmount,
      concept: concept.trim(),
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
    <form className="cobrar-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Monto (MXN)</span>
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
        <span>Concepto</span>
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
          onChange={(e) => setNumRef(e.target.value.replace(/\D/g, "").slice(0, 7))}
        />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Creando…" : "Cobrar"}
      </button>
    </form>
  );
}
