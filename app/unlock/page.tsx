"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UnlockPage() {
  const router = useRouter();
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
        setError(data.error?.message || "Token inválido");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Error de red");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell">
      <header className="topbar">
        <Link href="/" className="brand">
          Pey
        </Link>
      </header>
      <section className="panel">
        <h1 className="title">Desbloquear demo</h1>
        <p className="lede">
          Ingresa el token compartido para crear cobros y enviar WhatsApp.
        </p>
        <form className="cobrar-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Demo access token</span>
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
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Validando…" : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
