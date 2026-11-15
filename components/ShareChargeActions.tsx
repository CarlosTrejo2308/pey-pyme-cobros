"use client";

import { useEffect, useState } from "react";

function absoluteShareUrl(shareUrl: string): string {
  if (shareUrl.startsWith("http")) return shareUrl;
  if (typeof window === "undefined") return shareUrl;
  return `${window.location.origin}${shareUrl.startsWith("/") ? "" : "/"}${shareUrl}`;
}

function shareText(amount: number, concept: string, url: string): string {
  return `Te cobro $${amount.toFixed(2)} MXN — ${concept}\nPaga con CoDi aquí: ${url}`;
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

  async function onCopy() {
    setShareError(null);
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setShareError("No se pudo copiar. Selecciona el link manualmente.");
    }
  }

  async function onNativeShare() {
    setShareError(null);
    const absolute = url();
    const text = shareText(amount, concept, absolute);
    try {
      await navigator.share({
        title: "Cobro CoDi · CobroLibre",
        text,
        url: absolute,
      });
    } catch (err) {
      const name = err instanceof Error ? err.name : "";
      if (name === "AbortError") return;
      setShareError("No se pudo abrir el menú de compartir. Usa Copiar link.");
    }
  }

  function onWhatsAppApp() {
    setShareError(null);
    const absolute = url();
    const text = shareText(amount, concept, absolute);
    const href = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="share-panel">
      <p className="share-lead">
        Comparte el link o el QR con tu cliente (WhatsApp, Mensajes, etc.).
      </p>
      <div className="actions share-actions">
        {canNativeShare ? (
          <button
            type="button"
            className="btn"
            onClick={onNativeShare}
            disabled={disabled}
          >
            Compartir
          </button>
        ) : null}
        <button
          type="button"
          className="btn alt"
          onClick={onCopy}
          disabled={disabled}
        >
          {copied ? "Link copiado" : "Copiar link"}
        </button>
        <button
          type="button"
          className="btn wa"
          onClick={onWhatsAppApp}
          disabled={disabled}
        >
          Abrir WhatsApp
        </button>
      </div>
      {shareError ? <p className="form-error">{shareError}</p> : null}
      <p className="form-hint">
        Usa el menú de tu teléfono para enviar el cobro. No hace falta sandbox
        de Twilio para la demo.
      </p>
    </div>
  );
}
