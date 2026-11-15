"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AppShell } from "@/components/AppShell";
import { CobrarForm } from "@/components/CobrarForm";
import { useI18n } from "@/components/I18nProvider";

function CobrarInner() {
  const params = useSearchParams();
  const { t } = useI18n();
  const concept = params.get("concept") || "";
  const amount = params.get("amount") || "0.01";

  return (
    <AppShell subtitleKey="subCobrar">
      <section className="card">
        <div className="greca" aria-hidden />
        <h2>{t("cobrarTitle")}</h2>
        <p className="demo-strip" role="note" style={{ marginBottom: 12 }}>
          <span className="demo-strip-label">{t("demoLabel")}</span>{" "}
          {t("cobrarDemo")}
        </p>
        <p className="hint" style={{ marginBottom: 12 }}>
          {t("cobrarHint")}
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
          <p className="pulse">…</p>
        </AppShell>
      }
    >
      <CobrarInner />
    </Suspense>
  );
}
