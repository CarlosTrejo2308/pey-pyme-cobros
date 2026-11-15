"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DemoStub } from "@/components/DemoStub";

type Item = { id: number; name: string; price: number; type: string };

const SEED: Item[] = [
  {
    id: 1,
    name: "Recorrido guiado Centro Histórico",
    price: 450,
    type: "Tour",
  },
  { id: 2, name: "Rebozo tejido a mano", price: 850, type: "Artesanía" },
  { id: 3, name: "Taller de alebrijes", price: 600, type: "Taller" },
  { id: 4, name: "Corte y peinado", price: 200, type: "Servicio" },
];

export default function CatalogoPage() {
  const [items, setItems] = useState(SEED);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function add() {
    const p = Number(price);
    if (!name.trim() || !(p > 0)) return;
    setItems((list) => [
      ...list,
      { id: Date.now(), name: name.trim(), price: p, type: "Producto" },
    ]);
    setName("");
    setPrice("");
  }

  return (
    <AppShell subtitle="Catálogo (demo)">
      <DemoStub title="Mis productos y servicios">
        <p className="hint">
          Guarda precios una vez y cobra con un toque. Cobrar abre el flujo real
          Pey.
        </p>

        <label className="field">
          <span>Nombre</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tour, taller o producto"
          />
        </label>
        <label className="field">
          <span>Precio en pesos</span>
          <input
            type="number"
            min={0.01}
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="button" className="btn alt" onClick={add}>
          Agregar al catálogo
        </button>

        {items.length === 0 ? (
          <p className="hint">Tu catálogo está vacío.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item">
              <div>
                <b>{item.name}</b>
                <p className="hint">
                  ${item.price.toFixed(2)} · {item.type}
                </p>
              </div>
              <div className="row" style={{ flex: "0 0 auto", maxWidth: 200 }}>
                <Link
                  href={`/cobrar?concept=${encodeURIComponent(item.name)}&amount=${item.price}`}
                  className="btn sm"
                >
                  Cobrar esto
                </Link>
                <button
                  type="button"
                  className="btn alt sm"
                  onClick={() =>
                    setItems((list) => list.filter((x) => x.id !== item.id))
                  }
                >
                  Quitar
                </button>
              </div>
            </div>
          ))
        )}
      </DemoStub>
    </AppShell>
  );
}
