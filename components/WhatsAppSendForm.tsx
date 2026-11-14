"use client";

import { FormEvent, useState } from "react";

export function WhatsAppSendForm({
  chargeId,
  disabled,
}: {
  chargeId: string;
  disabled?: boolean;
}) {
  const [toE164, setToE164] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch(`/api/charges/${chargeId}/whatsapp`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toE164: toE164.trim() }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        twilioSid?: string;
        error?: { message?: string };
      };
      if (!res.ok) {
        setError(data.error?.message || "No se pudo enviar WhatsApp");
        return;
      }
      setMessage(`Enviado (${data.twilioSid})`);
    } catch {
      setError("Error de red al enviar WhatsApp");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="wa-form" onSubmit={onSubmit}>
      <label className="field">
        <span>WhatsApp (E.164 verificado)</span>
        <input
          type="tel"
          name="toE164"
          placeholder="+525512345678"
          value={toE164}
          onChange={(e) => setToE164(e.target.value)}
          disabled={disabled || busy}
          required
          autoComplete="tel"
        />
      </label>
      <button
        type="submit"
        className="btn btn-secondary"
        disabled={disabled || busy || !toE164.trim()}
      >
        {busy ? "Enviando…" : "Enviar WhatsApp"}
      </button>
      {message ? <p className="form-ok">{message}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
      <p className="form-hint">
        Trial Twilio: solo números verificados. El pago sigue por QR en esta
        página.
      </p>
    </form>
  );
}
