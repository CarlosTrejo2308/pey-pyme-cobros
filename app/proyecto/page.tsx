import { AppShell } from "@/components/AppShell";

export default function ProyectoPage() {
  return (
    <AppShell subtitle="Proyecto">
      <section className="card">
        <div className="greca" aria-hidden />
        <h2>Sobre CobroLibre + Pey</h2>
        <p>
          <strong>
            Cobra con QR y WhatsApp; el dinero llega directo a tu cuenta, sin
            comisión por cobro de CobroLibre.
          </strong>{" "}
          Sobre rieles públicos de Banxico (SPEI/CoDi) vía Pey. Pensado para
          PyMEs de todos los giros, con UI accesible e identidad mexicana.
        </p>
      </section>

      <section className="card">
        <h3>¿Para quién?</h3>
        <ul className="hint" style={{ paddingLeft: "1.2rem", fontSize: "0.95rem", color: "var(--ink)" }}>
          <li>Comercios y servicios: tiendas, fondas, talleres, consultorios.</li>
          <li>Turismo y artesanía: guías, tours, mercados y ferias.</li>
          <li>Personas mayores: letra grande, contraste y asistente amable.</li>
        </ul>
      </section>

      <section className="card">
        <h3>Qué es real en esta app</h3>
        <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
          <li>
            <strong>Cobrar</strong> → <code>POST /api/charges</code> → Pey{" "}
            <code>POST /codi/qr</code> → DynamoDB → página <code>/c/[id]</code>
          </li>
          <li>
            <strong>WhatsApp</strong> → Twilio trial template (si está
            configurado)
          </li>
          <li>
            <strong>Pagado</strong> → webhook Pey <code>/api/webhooks/pey</code>
          </li>
          <li>
            <strong>Ventas</strong> → lista real desde DynamoDB
          </li>
        </ul>
        <p className="notice">
          Pagar por voz, catálogo, recurrentes y el chat de Lupita son demos de
          UI del prototipo CobroLibre; no mueven dinero.
        </p>
      </section>

      <section className="card">
        <h3>Psicología del color</h3>
        <p className="hint" style={{ fontSize: "0.95rem", color: "var(--ink)" }}>
          Verde · confianza · Cobrar. Azul · seguridad · Pagar. Naranja ·
          cercanía · Lupita. Rosa mexicano · identidad. Fondo crema para cansar
          menos la vista.
        </p>
      </section>
    </AppShell>
  );
}
