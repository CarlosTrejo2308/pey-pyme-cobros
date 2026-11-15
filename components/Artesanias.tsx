"use client";

import { useId, type ReactNode } from "react";
import { useI18n } from "@/components/I18nProvider";
import type { MsgKey } from "@/lib/i18n";

function Bandera({ width = 84 }: { width?: number }) {
  const { t } = useI18n();
  return (
    <svg
      width={width}
      viewBox="0 0 90 60"
      role="img"
      aria-label={t("flagAria")}
    >
      <rect width="90" height="60" rx="4" fill="#fff" stroke="#bbb" />
      <rect width="30" height="60" rx="4" fill="#006847" />
      <rect x="60" width="30" height="60" rx="4" fill="#CE1126" />
      <rect x="26" width="8" height="60" fill="#006847" />
      <rect x="56" width="8" height="60" fill="#fff" />
      <circle cx="45" cy="30" r="9.5" fill="#C9A24B" />
      <path
        d="M36 33q9 11 18 0"
        stroke="#006847"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="45" cy="28" r="3.2" fill="#7a4a1a" />
    </svg>
  );
}

function Sello({ width = 120 }: { width?: number }) {
  const { t } = useI18n();
  const pathId = useId().replace(/:/g, "");
  const petals = Array.from({ length: 10 }, (_, i) => (
    <ellipse
      key={i}
      cx="80"
      cy="64"
      rx="6.5"
      ry="13"
      fill="#F5A300"
      transform={`rotate(${i * 36} 80 80)`}
    />
  ));

  return (
    <svg
      width={width}
      viewBox="0 0 160 160"
      role="img"
      aria-label={t("sealAria")}
    >
      <defs>
        <path
          id={pathId}
          d="M80 80m-57 0a57 57 0 1 1 114 0a57 57 0 1 1-114 0"
        />
      </defs>
      <circle
        cx="80"
        cy="80"
        r="76"
        fill="#fff"
        stroke="#006847"
        strokeWidth="7"
      />
      <circle
        cx="80"
        cy="80"
        r="68"
        fill="none"
        stroke="#CE1126"
        strokeWidth="3"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      <text fontSize="9.5" fontWeight="700" fill="#0B6B4F">
        <textPath
          href={`#${pathId}`}
          startOffset="0"
          textLength="350"
          lengthAdjust="spacing"
        >
          HECHO CON CARIÑO EN MÉXICO ★ ORGULLOSAMENTE MEXICANO ★
        </textPath>
      </text>
      <circle cx="80" cy="80" r="40" fill="#FFF4D6" />
      {petals}
      <circle cx="80" cy="80" r="9" fill="#B34E0A" />
    </svg>
  );
}

function Alebrije() {
  return (
    <g transform="translate(-2 4) scale(.9)">
      <path
        d="M12 44c-9-7-6-19 3-21"
        stroke="#1F5FA8"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="42" cy="48" rx="27" ry="15" fill="#E6007E" />
      {[26, 36, 53, 63].map((x, i) => (
        <rect
          key={x}
          x={x - 4}
          y={i % 2 ? 58 : 56}
          width="8"
          height={i % 2 ? 13 : 15}
          rx="3"
          fill="#F5A300"
        />
      ))}
      <path
        d="M20 46q7-8 14 0t14 0t14 0"
        stroke="#0B6B4F"
        strokeWidth="3"
        fill="none"
      />
      <g fill="#fff">
        <circle cx="28" cy="53" r="2.4" />
        <circle cx="40" cy="55" r="2.4" />
        <circle cx="52" cy="53" r="2.4" />
      </g>
      <circle cx="68" cy="34" r="13" fill="#F5A300" />
      <path d="M58 26l-5-13 12 8zM76 25l7-12 1 14z" fill="#0B6B4F" />
      <circle cx="72" cy="32" r="2.8" fill="#1B1B1B" />
      <ellipse cx="76" cy="40" rx="5" ry="3.5" fill="#1F5FA8" />
      <path
        d="M62 30q3-3 6 0"
        stroke="#E6007E"
        strokeWidth="2"
        fill="none"
      />
    </g>
  );
}

function Fig({
  labelKey,
  children,
}: {
  labelKey: MsgKey;
  children: ReactNode;
}) {
  const { t } = useI18n();
  const label = t(labelKey);
  return (
    <figure>
      <svg viewBox="0 0 80 80" role="img" aria-label={label}>
        {children}
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

/** Five craft SVG figuritas from prototipo `artesanias()`. */
export function ArtesaniasGrid() {
  const fringe = Array.from({ length: 14 }, (_, i) => (
    <path
      key={i}
      d={`M${14 + i * 4} 62v9`}
      stroke="#E6007E"
      strokeWidth="2"
    />
  ));
  const petals = Array.from({ length: 12 }, (_, i) => (
    <ellipse
      key={i}
      cx="40"
      cy="22"
      rx="8"
      ry="15"
      fill={i % 2 ? "#F5A300" : "#FFB627"}
      transform={`rotate(${i * 30} 40 40)`}
    />
  ));

  return (
    <div className="arts">
      <Fig labelKey="a1">
        <path
          d="M20 30C8 42 12 68 40 70c28-2 32-28 20-40z"
          fill="#C8672B"
        />
        <path d="M28 30l2-11h20l2 11z" fill="#A9511F" />
        <ellipse cx="40" cy="19" rx="11" ry="3.5" fill="#7a3a15" />
        <path
          d="M14 48q13-7 26 0t26 0"
          stroke="#fff"
          strokeWidth="3.5"
          fill="none"
        />
        <g fill="#1F5FA8">
          <circle cx="24" cy="57" r="3" />
          <circle cx="40" cy="60" r="3" />
          <circle cx="56" cy="57" r="3" />
        </g>
      </Fig>

      <Fig labelKey="a2">
        <rect x="12" y="14" width="56" height="48" fill="#fff" />
        <rect x="12" y="14" width="56" height="7" fill="#E6007E" />
        <rect x="12" y="23" width="56" height="5" fill="#0B6B4F" />
        <rect x="12" y="30" width="56" height="14" fill="#F5A300" />
        <path d="M40 31l9 6-9 6-9-6z" fill="#1F5FA8" />
        <rect x="12" y="46" width="56" height="5" fill="#0B6B4F" />
        <rect x="12" y="53" width="56" height="9" fill="#E6007E" />
        {fringe}
      </Fig>

      <Fig labelKey="a3">
        {petals}
        <circle cx="40" cy="40" r="9" fill="#B34E0A" />
      </Fig>

      <Fig labelKey="a4">
        <ellipse cx="40" cy="56" rx="36" ry="11" fill="#C9A24B" />
        <path d="M24 55C24 22 56 22 56 55z" fill="#D9B45B" />
        <path d="M24 47h32" stroke="#E6007E" strokeWidth="6" />
        <g fill="#fff">
          <circle cx="14" cy="58" r="2" />
          <circle cx="26" cy="64" r="2" />
          <circle cx="40" cy="66" r="2" />
          <circle cx="54" cy="64" r="2" />
          <circle cx="66" cy="58" r="2" />
        </g>
      </Fig>

      <Fig labelKey="a5">
        <Alebrije />
      </Fig>
    </div>
  );
}

/** Full “Hecho con cariño” block: flag + copy + figuritas + seal. */
export function OrgulloMexico() {
  const { t } = useI18n();
  return (
    <section className="card orgullo" aria-label={t("orgT")}>
      <div className="orow">
        <Bandera />
        <div className="orgullo-copy">
          <h3>{t("orgT")}</h3>
          <p>{t("orgP")}</p>
        </div>
      </div>
      <ArtesaniasGrid />
      <div className="orow orgullo-seal">
        <Sello />
      </div>
      <p className="hint">{t("orgHint")}</p>
    </section>
  );
}
