"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AppShell } from "@/components/AppShell";
import { CobrarForm } from "@/components/CobrarForm";

function CobrarInner() {
  const params = useSearchParams();
  const concept = params.get("concept") || "";
  const amount = params.get("amount") || "0.01";

  return (
    <AppShell subtitle="Cobrar con CoDi">
      <section className="card">
        <div className="greca" aria-hidden />
        <h2>Cobrar</h2>
        <p className="hint" style={{ marginBottom: 12 }}>
          Crea un cobro CoDi real vía Pey. Luego muestras el QR o compartes el
          link (WhatsApp, Mensajes, etc.). El estado Pagado llega por webhook —
          no es simulación.
        </p>
        <CobrarForm initialConcept={concept} initialAmount={amount} />
      </section>
    </AppShell>
  );
}

export default function CobrarPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <p className="pulse">Cargando…</p>
        </AppShell>
      }
    >
      <CobrarInner />
    </Suspense>
  );
}
