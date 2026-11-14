import Link from "next/link";
import { CobrarForm } from "@/components/CobrarForm";

export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <Link href="/" className="brand" aria-current="page">
          Pey
        </Link>
        <nav className="nav">
          <Link href="/">Cobrar</Link>
          <Link href="/sales">Ventas</Link>
          <Link href="/unlock">Acceso</Link>
        </nav>
      </header>

      <section className="hero-cobrar">
        <p className="brand-mark">Pey</p>
        <h1 className="title">Cobrar</h1>
        <p className="lede">
          Crea un cobro CoDi, muestra el QR y confirma el pago en vivo — sin
          depender del banco de tu cliente.
        </p>
        <CobrarForm />
      </section>
    </main>
  );
}
