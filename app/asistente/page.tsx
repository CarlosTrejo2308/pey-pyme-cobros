"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DemoStub } from "@/components/DemoStub";
import { LupitaAvatar } from "@/components/LupitaAvatar";

type Msg = { role: "me" | "bot"; text: string };

const HELLO =
  'Hola 👋 Soy Lupita. Puedes escribirme cosas como "cobra 300 a Juan" o "¿cuánto vendí hoy?". Los cobros reales se crean en Cobrar; aquí te guío.';

const CHIPS = [
  "¿Cuánto vendí hoy?",
  "¿Quién me debe?",
  "Cobra 300 a Juan",
  "Ayuda",
];

function reply(input: string): { text: string; chargeHint?: { amount: number; name: string } } {
  const x = input.trim().toLowerCase();
  if (!x) return { text: "Escribe un mensaje o toca una sugerencia." };

  if (/ayuda|help|aide|帮助/.test(x)) {
    return {
      text: "Puedo orientarte a:\n• Crear cobros reales: ve a Cobrar o di «cobra 300 a Juan»\n• Ver ventas en la lista real\n• Explorar demos de mensuales, catálogo y pagar\nLos pagos por voz / Pagar son solo demostración.",
    };
  }

  if (/vendi|vendí|recib|cu[aá]nto|how much|aujourd/.test(x)) {
    return {
      text: "Para ver lo recibido de verdad abre Ventas (datos en Dynamo + Pey). Aquí no invento totales.",
    };
  }

  if (/debe|debe\?|owe|doit/.test(x)) {
    return {
      text: "Los pendientes reales están en Ventas con estado Pendiente. Ábrelos desde ahí.",
    };
  }

  const charge =
    x.match(
      /(?:cobra|cobrar|charge|encaisse)\s+(\d+(?:[.,]\d+)?)\s+(?:a|to|para|pour)\s+(.+)/i,
    ) ||
    x.match(/(\d+(?:[.,]\d+)?)\s+(?:a|to)\s+([a-záéíóúñü][\wáéíóúñü\s]+)/i);

  if (charge) {
    const amount = Number(charge[1].replace(",", "."));
    const name = charge[2].trim().replace(/[?.!]+$/, "");
    if (amount >= 0.01 && name) {
      return {
        text: `¡Ándale! Te llevo a Cobrar con $${amount.toFixed(2)} para ${name}. Ahí se crea el QR CoDi real con Pey.`,
        chargeHint: { amount, name },
      };
    }
  }

  if (/paga|pagar|pay|paie/.test(x)) {
    return {
      text: "Pagar a terceros es solo demo en esta versión. Abre Pagar para probar el flujo con confirmación.",
    };
  }

  return {
    text: 'No entendí bien. Prueba: "cobra 300 a Juan", "¿cuánto vendí hoy?" o "ayuda".',
  };
}

export default function AsistentePage() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: HELLO }]);
  const [q, setQ] = useState("");
  const [pendingCharge, setPendingCharge] = useState<{
    amount: number;
    name: string;
  } | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [msgs]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const r = reply(trimmed);
    setMsgs((m) => [
      ...m,
      { role: "me", text: trimmed },
      { role: "bot", text: r.text },
    ]);
    setPendingCharge(r.chargeHint ?? null);
    setQ("");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    send(q);
  }

  return (
    <AppShell subtitle="Lupita">
      <DemoStub title="Mi asistente">
        <p className="hint">
          Así se ve dentro de WhatsApp. Las sugerencias de cobro te llevan al
          flujo real; el chat en sí no llama a Pey.
        </p>

        <div className="wa-box">
          <div className="wa-head">
            <LupitaAvatar size={44} crop />
            <div>
              Lupita
              <small>en línea · CobroLibre</small>
            </div>
          </div>
          <div className="chat" ref={chatRef}>
            {msgs.map((m, i) => (
              <div key={`${m.role}-${i}`} className={`msg ${m.role}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form className="wa-in" onSubmit={onSubmit}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Escribe aquí…"
              aria-label="Mensaje para Lupita"
            />
            <button type="submit" aria-label="Enviar">
              ➤
            </button>
          </form>
        </div>

        <div className="chips">
          {CHIPS.map((c) => (
            <button key={c} type="button" onClick={() => send(c)}>
              {c}
            </button>
          ))}
        </div>

        {pendingCharge ? (
          <Link
            href={`/cobrar?concept=${encodeURIComponent(`${pendingCharge.name} · Cobro por asistente`)}&amount=${pendingCharge.amount}`}
            className="btn"
          >
            Ir a Cobrar ${pendingCharge.amount.toFixed(2)} → {pendingCharge.name}
          </Link>
        ) : (
          <Link href="/cobrar" className="btn alt">
            Ir a Cobrar (real)
          </Link>
        )}
      </DemoStub>
    </AppShell>
  );
}
