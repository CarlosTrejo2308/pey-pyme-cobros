"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";

function absoluteShareUrl(shareUrl: string): string {
  if (shareUrl.startsWith("http")) return shareUrl;
  if (typeof window === "undefined") return shareUrl;
  return `${window.location.origin}${shareUrl.startsWith("/") ? "" : "/"}${shareUrl}`;
}

/**
 * Primary demo share path: OS share sheet (Web Share API) + copy link.
 * Optional wa.me deep link opens the device WhatsApp app without Twilio.
 */
export function ShareChargeActions({
  shareUrl,
  amount,
  concept,
  disabled,
}: {
  shareUrl: string;
  amount: number;
  concept: string;
  disabled?: boolean;
}) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function",
    );
  }, []);

  function url() {
    return absoluteShareUrl(shareUrl);
  }

  function buildShareText(absolute: string) {
    return t("shareText", {
      m: amount.toFixed(2),
      c: concept,
      u: absolute,
    });
  }

  async function onCopy() {
    setShareError(null);
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setShareError(t("copyFail"));
    }
  }

  async function onNativeShare() {
    setShareError(null);
    const absolute = url();
    const text = buildShareText(absolute);
    try {
      await navigator.share({
        title: t("shareTitle"),
        text,
        url: absolute,
      });
    } catch (err) {
      const name = err instanceof Error ? err.name : "";
      if (name === "AbortError") return;
      setShareError(t("shareFail"));
    }
  }

  function onWhatsAppApp() {
    setShareError(null);
    const absolute = url();
    const text = buildShareText(absolute);
    const href = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="share-panel">
      <p className="share-lead">{t("shareLead")}</p>
      <div className="actions share-actions">
        {canNativeShare ? (
          <button
            type="button"
            className="btn"
            onClick={onNativeShare}
            disabled={disabled}
          >
            {t("shareBtn")}
          </button>
        ) : null}
        <button
          type="button"
          className="btn alt"
          onClick={onCopy}
          disabled={disabled}
        >
          {copied ? t("linkCopied") : t("copyLink")}
        </button>
        <button
          type="button"
          className="btn wa"
          onClick={onWhatsAppApp}
          disabled={disabled}
        >
          {t("openWa")}
        </button>
      </div>
      {shareError ? <p className="form-error">{shareError}</p> : null}
      <p className="form-hint">{t("shareHint")}</p>
    </div>
  );
}
