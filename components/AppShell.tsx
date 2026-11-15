"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { LupitaAvatar } from "@/components/LupitaAvatar";

const NAV = [
  { href: "/", label: "Inicio", icon: "🏠", match: (p: string) => p === "/" },
  {
    href: "/cobrar",
    label: "Cobrar",
    icon: "💵",
    match: (p: string) => p.startsWith("/cobrar") || p.startsWith("/c/"),
  },
  {
    href: "/sales",
    label: "Ventas",
    icon: "📋",
    match: (p: string) => p.startsWith("/sales"),
  },
  {
    href: "/asistente",
    label: "Ayuda",
    icon: "💬",
    match: (p: string) => p.startsWith("/asistente"),
  },
  {
    href: "/proyecto",
    label: "Info",
    icon: "ℹ️",
    match: (p: string) => p.startsWith("/proyecto"),
  },
] as const;

const FONT_STEPS = [18, 20, 22, 24] as const;

export function AppShell({
  children,
  subtitle = "Cobra sin comisiones",
  showNav = true,
}: {
  children: ReactNode;
  subtitle?: string;
  showNav?: boolean;
}) {
  const pathname = usePathname();
  const [fontStep, setFontStep] = useState(1);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--fs",
      `${FONT_STEPS[fontStep]}px`,
    );
  }, [fontStep]);

  function bumpFont() {
    setFontStep((s) => (s + 1) % FONT_STEPS.length);
  }

  return (
    <div className={`app-shell ${showNav ? "with-nav" : ""}`}>
      <header className="cl-header">
        <Link href="/" className="cl-brand" aria-label="CobroLibre inicio">
          <LupitaAvatar size={44} crop className="cl-hav" />
          <span>
            <strong>CobroLibre</strong>
            <small>{subtitle}</small>
          </span>
        </Link>
        <div className="cl-tools">
          <button
            type="button"
            className="tool-btn"
            aria-label="Aumentar tamaño de letra"
            onClick={bumpFont}
          >
            Aa
          </button>
          <Link href="/unlock" className="tool-btn" aria-label="Acceso demo">
            🔑
          </Link>
        </div>
      </header>

      <div className="papel" aria-hidden>
        <svg viewBox="0 0 400 50" preserveAspectRatio="none">
          <path
            d="M0 5Q200 14 400 5"
            stroke="#8a6d3b"
            strokeWidth="2"
            fill="none"
          />
          {[
            "#E6007E",
            "#0B6B4F",
            "#1F5FA8",
            "#C2185B",
            "#B34E0A",
            "#0E6E7E",
            "#6B3FA0",
            "#E6007E",
          ].map((c, i) => {
            const x = i * 50 + 5;
            const y = 9 + Math.sin(i / 7) * 3;
            return (
              <g key={c + i} transform={`translate(${x} ${y})`}>
                <path
                  d="M0 0h40v28l-5 6-5-6-5 6-5-6-5 6-5-6-5 6-5-6z"
                  fill={c}
                />
                <circle cx="20" cy="12" r="4" fill="#FFFBF2" />
              </g>
            );
          })}
        </svg>
      </div>

      <main className="cl-main">{children}</main>

      {showNav ? (
        <nav className="cl-nav" aria-label="Menú principal">
          {NAV.map((item) => {
            const current = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                data-v={item.label.toLowerCase()}
              >
                <span className="i" aria-hidden>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
