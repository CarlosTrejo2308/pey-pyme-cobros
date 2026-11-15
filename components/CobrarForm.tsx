"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MatiAvatar } from "@/components/MatiAvatar";
import { useI18n } from "@/components/I18nProvider";

export function CobrarForm({
  initialConcept = "",
  initialAmount = "0.01",
}: {
  initialConcept?: string;
  initialAmount?: string;
}) {
  const router = useRouter();
  const { t } = useI18n();
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState(initialAmount);
  const [concept, setConcept] = useState(
    () => initialConcept || "Demo cobro",
  );
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
        setError(data.error?.message || t("cErrCreate"));
        return;
      }

      router.push(`/c/${data.chargeId}`);
    } catch {
      setError(t("cErrNet"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="guide">
        <MatiAvatar size={68} crop />
        <div className="bubble">{t("guideCobrar")}</div>
      </div>

      <form className="cobrar-form" onSubmit={onSubmit}>
        <label className="field">
          <span>{t("cName")}</span>
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
          <span>{t("cAmt")}</span>
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
          <span>{t("cWhy")}</span>
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
          <span>{t("cRef")}</span>
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
        <p className="hint">{t("cHint")}</p>
        <button type="submit" className="btn" disabled={busy}>
          {busy ? t("cCreating") : t("cMk")}
        </button>
      </form>
    </>
  );
}
