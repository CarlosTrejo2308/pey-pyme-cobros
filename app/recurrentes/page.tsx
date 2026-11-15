"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DemoStub } from "@/components/DemoStub";

type Rec = {
  id: number;
  client: string;
  amount: number;
  freq: string;
  day: number;
  status: "active" | "wait" | "paused";
};

const INITIAL: Rec[] = [
  {
    id: 1,
    client: "Casa Sol (renta de local)",
    amount: 1200,
    freq: "mensual",
    day: 5,
    status: "active",
  },
  {
    id: 2,
    client: "Doña Lupita",
    amount: 350,
    freq: "semanal",
    day: 1,
    status: "active",
  },
];

const STATUS_LABEL = {
  active: "Activo",
  wait: "Esperando autorización",
  paused: "Pausado",
} as const;

export default function RecurrentesPage() {
  const [recs, setRecs] = useState(INITIAL);
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("500");
  const [day, setDay] = useState("1");

  function addRec() {
    const a = Number(amount);
    const d = Number(day);
    if (!client.trim() || !(a > 0) || !(d >= 1 && d <= 28)) return;
    setRecs((r) => [
      ...r,
      {
        id: Date.now(),
        client: client.trim(),
        amount: a,
        freq: "mensual",
        day: d,
        status: "wait",
      },
    ]);
    setClient("");
  }

  return (
    <AppShell subtitle="Mensuales (demo)">
      <DemoStub title="Cobros mensuales">
        <p className="hint">
          Cada cliente debe autorizar la domiciliación. En producción se pediría
          por WhatsApp; aquí es solo UI.
        </p>

        <label className="field">
          <span>Cliente</span>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Rosa Hernández"
          />
        </label>
        <label className="field">
          <span>Monto (MXN)</span>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Día del cobro (1–28)</span>
          <input
            type="number"
            min={1}
            max={28}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </label>
        <button type="button" className="btn" onClick={addRec}>
          Pedir autorización (demo)
        </button>

        <h3 style={{ marginTop: 18 }}>Mis cobros programados</h3>
        {recs.map((r) => (
          <div key={r.id} className="item">
            <div>
              <b>{r.client}</b>
              <p className="hint">
                ${r.amount.toFixed(2)} · {r.freq} · día {r.day}
              </p>
              <span
                className={`tag ${r.status === "active" ? "t-ok" : r.status === "wait" ? "t-pe" : "t-pa"}`}
              >
                {STATUS_LABEL[r.status]}
              </span>
            </div>
            <div className="row" style={{ flex: "0 0 auto", maxWidth: 180 }}>
              {r.status === "wait" ? (
                <button
                  type="button"
                  className="btn sm"
                  onClick={() =>
                    setRecs((list) =>
                      list.map((x) =>
                        x.id === r.id ? { ...x, status: "active" } : x,
                      ),
                    )
                  }
                >
                  Simular: autorizó
                </button>
              ) : (
                <Link
                  href={`/cobrar?concept=${encodeURIComponent(`Cobro recurrente · ${r.client}`)}&amount=${r.amount}`}
                  className="btn sm"
                >
                  Cobrar hoy
                </Link>
              )}
            </div>
          </div>
        ))}
      </DemoStub>
    </AppShell>
  );
}
