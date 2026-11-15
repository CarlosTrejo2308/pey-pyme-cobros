"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { OrgulloMexico } from "@/components/Artesanias";
import { MatiAvatar } from "@/components/MatiAvatar";
import { ChargeStatusBadge } from "@/components/ChargeStatus";
import { useI18n } from "@/components/I18nProvider";
import type { ChargeListItem } from "@/types/charge";

export default function HomePage() {
  const { t, mx, lang } = useI18n();
  const [items, setItems] = useState<ChargeListItem[]>([]);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/charges?limit=5", {
          credentials: "include",
          cache: "no-store",
        });
        if (res.status === 401) {
          if (!cancelled) setLocked(true);
          return;
        }
        if (!res.ok) return;
        const data = (await res.json()) as { items?: ChargeListItem[] };
        if (!cancelled) {
          setItems(data.items ?? []);
          setLocked(false);
        }
      } catch {
        /* home still works without sales preview */
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const paid = items.filter((i) => i.status === "paid");
  const received = paid.reduce((s, i) => s + i.amount, 0);
  const savedApprox = Math.round(received * 0.036 * 1.16 * 100) / 100;

  return (
    <AppShell>
      <p className="demo-strip" role="note">
        <span className="demo-strip-label">{t("demoLabel")}</span>{" "}
        {locked ? (
          lang === "es" ? (
            <>
              Primero <Link href="/unlock">{t("unlockLink")}</Link>, luego{" "}
              <Link href="/cobrar">{t("cobrarLink")}</Link>.
            </>
          ) : lang === "en" ? (
            <>
              First <Link href="/unlock">{t("unlockLink")}</Link>, then{" "}
              <Link href="/cobrar">{t("cobrarLink")}</Link>.
            </>
          ) : lang === "zh" ? (
            <>
              先
              <Link href="/unlock">{t("unlockLink")}</Link>
              ，再
              <Link href="/cobrar">{t("cobrarLink")}</Link>。
            </>
          ) : (
            <>
              D&apos;abord <Link href="/unlock">{t("unlockLink")}</Link>, puis{" "}
              <Link href="/cobrar">{t("cobrarLink")}</Link>.
            </>
          )
        ) : lang === "es" ? (
          <>
            Empieza en <Link href="/cobrar">{t("cobrarLink")}</Link> → QR →
            Compartir → <Link href="/sales">{t("salesLink")}</Link>.
          </>
        ) : lang === "en" ? (
          <>
            Start at <Link href="/cobrar">{t("cobrarLink")}</Link> → QR → Share
            → <Link href="/sales">{t("salesLink")}</Link>.
          </>
        ) : lang === "zh" ? (
          <>
            从
            <Link href="/cobrar">{t("cobrarLink")}</Link>
            开始 → 二维码 → 分享 → <Link href="/sales">{t("salesLink")}</Link>
            。
          </>
        ) : (
          <>
            Commencez par <Link href="/cobrar">{t("cobrarLink")}</Link> → QR →
            Partager → <Link href="/sales">{t("salesLink")}</Link>.
          </>
        )}
      </p>

      <div className="hero-lupita">
        <MatiAvatar size={120} />
        <div className="bubble">{t("hiBubble")}</div>
      </div>

      <ol className="demo-path" aria-label={t("pathAria")}>
        <li className={locked ? "demo-step current" : "demo-step done"}>
          {locked ? (
            <Link href="/unlock">
              <b>{t("step1")}</b>
              <span>{t("step1Sub")}</span>
            </Link>
          ) : (
            <>
              <b>{t("step1")}</b>
              <span>{t("step1Done")}</span>
            </>
          )}
        </li>
        <li className={!locked ? "demo-step current" : "demo-step"}>
          <Link href="/cobrar">
            <b>{t("step2")}</b>
            <span>{t("step2Sub")}</span>
          </Link>
        </li>
        <li className="demo-step">
          <b>{t("step3")}</b>
          <span>{t("step3Sub")}</span>
        </li>
        <li className="demo-step">
          <Link href="/sales">
            <b>{t("step4")}</b>
            <span>{t("step4Sub")}</span>
          </Link>
        </li>
      </ol>

      {locked ? (
        <p className="notice">
          {t("noticeUnlock")}{" "}
          <Link href="/unlock">{t("unlockDemoCta")}</Link>
        </p>
      ) : (
        <div className="money">
          <p className="hint" style={{ marginTop: 0 }}>
            {t("receivedHint")}
          </p>
          <p className="big">{mx(received)}</p>
          <p className="hint">
            {t("savedHint")} {mx(savedApprox)}
          </p>
        </div>
      )}

      <div className="cta-stack">
        {locked ? (
          <Link href="/unlock" className="btn cta-primary">
            {t("unlockDemoCta")}
          </Link>
        ) : (
          <Link href="/cobrar" className="btn cta-primary">
            {t("cobrarLink")}
          </Link>
        )}
        <div className="p0-row">
          <Link
            href="/cobrar"
            className="tile tile-p0"
            style={{ background: "#0B6B4F" }}
          >
            <span className="tile-icon" aria-hidden>
              💵
            </span>
            <b>{t("tileCobrar")}</b>
            <span>{t("tileCobrarS")}</span>
          </Link>
          <Link
            href="/sales"
            className="tile tile-p0"
            style={{ background: "#6B3FA0" }}
          >
            <span className="tile-icon" aria-hidden>
              📋
            </span>
            <b>{t("tileVentas")}</b>
            <span>{t("tileVentasS")}</span>
          </Link>
        </div>
      </div>

      <details className="stub-fold">
        <summary>{t("stubFold")}</summary>
        <p className="hint section-label" style={{ marginTop: "0.65rem" }}>
          {t("stubHint")}
        </p>
        <div className="grid2 stub-grid">
          <Link
            href="/pagar"
            className="tile tile-stub"
            style={{ background: "#1F5FA8" }}
          >
            <span className="tile-icon" aria-hidden>
              📤
            </span>
            <b>{t("tilePagar")}</b>
            <span>{t("tilePagarS")}</span>
          </Link>
          <Link
            href="/recurrentes"
            className="tile tile-stub"
            style={{ background: "#3F4FA0" }}
          >
            <span className="tile-icon" aria-hidden>
              📅
            </span>
            <b>{t("tileMens")}</b>
            <span>{t("tilePagarS")}</span>
          </Link>
          <Link
            href="/asistente"
            className="tile tile-stub"
            style={{ background: "#B34E0A" }}
          >
            <span className="tile-icon" aria-hidden>
              💬
            </span>
            <b>{t("tileMati")}</b>
            <span>{t("tileMatiS")}</span>
          </Link>
          <Link
            href="/catalogo"
            className="tile tile-stub"
            style={{ background: "#0E6E7E" }}
          >
            <span className="tile-icon" aria-hidden>
              🛍️
            </span>
            <b>{t("tileCat")}</b>
            <span>{t("tileCatS")}</span>
          </Link>
        </div>
      </details>

      {!locked && items.length > 0 ? (
        <section className="card">
          <div className="greca" aria-hidden />
          <h3>{t("recentTitle")}</h3>
          <ul className="sales-list">
            {items.map((item) => (
              <li key={item.chargeId}>
                <Link href={`/c/${item.chargeId}`} className="sales-row">
                  <div>
                    <p className="sales-amount">${item.amount.toFixed(2)}</p>
                    <p className="sales-concept">{item.concept}</p>
                  </div>
                  <ChargeStatusBadge status={item.status} />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/sales" className="btn alt sm">
            {t("seeAllSales")}
          </Link>
        </section>
      ) : null}

      <OrgulloMexico />
    </AppShell>
  );
}
