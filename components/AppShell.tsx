"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MatiAvatar } from "@/components/MatiAvatar";
import { useI18n } from "@/components/I18nProvider";
import type { MsgKey } from "@/lib/i18n";

const NAV: {
  href: string;
  labelKey: MsgKey;
  icon: string;
  match: (p: string) => boolean;
}[] = [
  { href: "/", labelKey: "nInicio", icon: "🏠", match: (p) => p === "/" },
  {
    href: "/cobrar",
    labelKey: "nCobrar",
    icon: "💵",
    match: (p) => p.startsWith("/cobrar") || p.startsWith("/c/"),
  },
  {
    href: "/sales",
    labelKey: "nVentas",
    icon: "📋",
    match: (p) => p.startsWith("/sales"),
  },
  {
    href: "/asistente",
    labelKey: "nAyuda",
    icon: "💬",
    match: (p) => p.startsWith("/asistente"),
  },
  {
    href: "/proyecto",
    labelKey: "nInfo",
    icon: "ℹ️",
    match: (p) => p.startsWith("/proyecto"),
  },
];

const FONT_STEPS = [18, 20, 22, 24] as const;

export function AppShell({
  children,
  subtitle,
  subtitleKey = "sub",
  showNav = true,
}: {
  children: ReactNode;
  /** Override subtitle text (takes precedence over subtitleKey). */
  subtitle?: string;
  subtitleKey?: MsgKey;
  showNav?: boolean;
}) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [fontStep, setFontStep] = useState(1);
  const resolvedSubtitle = subtitle ?? t(subtitleKey);

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
        <Link href="/" className="cl-brand" aria-label={t("brandHome")}>
          <MatiAvatar size={44} crop className="cl-hav" />
          <span>
            <strong>CobroLibre</strong>
            <small>{resolvedSubtitle}</small>
          </span>
        </Link>
        <div className="cl-tools">
          <LanguageSwitcher />
          <button
            type="button"
            className="tool-btn"
            aria-label={t("fontAa")}
            onClick={bumpFont}
          >
            Aa
          </button>
          <Link href="/unlock" className="tool-btn" aria-label={t("unlockAria")}>
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
        <nav className="cl-nav" aria-label={t("navAria")}>
          {NAV.map((item) => {
            const current = item.match(pathname);
            const label = t(item.labelKey);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                data-v={label.toLowerCase()}
              >
                <span className="i" aria-hidden>
                  {item.icon}
                </span>
                {label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </div>
  );
}
