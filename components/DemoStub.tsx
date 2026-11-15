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
      <p className="demo-badge" role="status">
        Demo · no mueve dinero
      </p>
      <h2>{title}</h2>
      <p className="notice" role="note">
        Prototipo de visión CobroLibre. El camino real del pitch es{" "}
        <Link href="/cobrar">Cobrar</Link> → QR CoDi Pey → compartir link →
        Pagado.
      </p>
      {children}
    </section>
  );
}
