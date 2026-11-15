import Link from "next/link";
import type { ReactNode } from "react";

/** Marks prototype-only surfaces that are not wired to Pey yet. */
export function DemoStub({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="card">
      <div className="greca" aria-hidden />
      <h2>{title}</h2>
      <p className="notice" role="note">
        Vista de demostración del prototipo CobroLibre. No mueve dinero real.
        Para cobrar de verdad usa <Link href="/cobrar">Cobrar</Link> (QR CoDi
        Pey).
      </p>
      {children}
    </section>
  );
}
