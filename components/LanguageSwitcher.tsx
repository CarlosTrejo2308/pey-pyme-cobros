"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LANGS } from "@/lib/i18n";
import { useI18n } from "@/components/I18nProvider";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="tool-btn"
        aria-label={t("langAria")}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        🌐 {lang.toUpperCase()}
      </button>

      {open ? (
        <div
          className="lang-ov"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="lang-ovc"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
          >
            <h2 id={titleId}>🌐 {t("langT")}</h2>
            <div className="lang-list">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  className={`btn ${code === lang ? "" : "alt"}`}
                  onClick={() => {
                    setLang(code);
                    setOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
