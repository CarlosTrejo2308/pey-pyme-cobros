"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useI18n } from "@/components/I18nProvider";

export default function UnlockPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json()) as { error?: { message?: string } };
      if (!res.ok) {
        setError(data.error?.message || t("unlockInvalid"));
        return;
      }
      router.push("/cobrar");
      router.refresh();
    } catch {
      setError(t("netErr"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell subtitleKey="subUnlock" showNav={false}>
      <section className="card">
        <div className="greca" aria-hidden />
        <h2>{t("unlockTitle")}</h2>
        <p className="hint">{t("unlockHint")}</p>
        <form className="cobrar-form" onSubmit={onSubmit}>
          <label className="field">
            <span>{t("unlockToken")}</span>
            <input
              type="password"
              name="token"
              autoComplete="current-password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="btn" disabled={busy}>
            {busy ? t("unlockBusy") : t("unlockBtn")}
          </button>
        </form>
        <p className="hint" style={{ marginTop: 12 }}>
          <Link href="/">{t("nInicio")}</Link>
        </p>
      </section>
    </AppShell>
  );
}
