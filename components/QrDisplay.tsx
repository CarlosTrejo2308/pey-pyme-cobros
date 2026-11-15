"use client";

import { useId, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export function QrDisplay({
  qrString,
  size = 280,
  downloadName = "cobro-codi-qr",
  showDownload = false,
}: {
  qrString: string;
  size?: number;
  downloadName?: string;
  showDownload?: boolean;
}) {
  const svgWrapRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [dlError, setDlError] = useState<string | null>(null);
  const [dlBusy, setDlBusy] = useState(false);

  if (!qrString) {
    return (
      <div className="qr-placeholder" role="status">
        Sin datos de QR
      </div>
    );
  }

  async function onDownload() {
    setDlError(null);
    const wrap = svgWrapRef.current;
    const svg = wrap?.querySelector("svg");
    if (!svg) {
      setDlError("No se pudo preparar el QR.");
      return;
    }

    setDlBusy(true);
    try {
      const clone = svg.cloneNode(true) as SVGSVGElement;
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      const xml = new XMLSerializer().serializeToString(clone);
      const svgBlob = new Blob([xml], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      const img = new Image();
      const pad = 24;
      const canvasSize = size + pad * 2;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("img"));
        img.src = svgUrl;
      });

      const canvas = document.createElement("canvas");
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      ctx.drawImage(img, pad, pad, size, size);
      URL.revokeObjectURL(svgUrl);

      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `${downloadName}.png`;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setDlError("No se pudo descargar. Usa captura de pantalla.");
    } finally {
      setDlBusy(false);
    }
  }

  return (
    <div className="qr-display">
      <div
        className="qr-frame"
        ref={svgWrapRef}
        aria-labelledby={titleId}
        role="img"
      >
        <span id={titleId} className="sr-only">
          Código CoDi para pagar
        </span>
        <QRCodeSVG value={qrString} size={size} level="M" includeMargin />
      </div>
      {showDownload ? (
        <div className="qr-download">
          <button
            type="button"
            className="btn alt sm"
            onClick={onDownload}
            disabled={dlBusy}
          >
            {dlBusy ? "Preparando…" : "Descargar QR"}
          </button>
          {dlError ? <p className="form-error">{dlError}</p> : null}
          <p className="form-hint">
            PNG para proyector o impresión. El pago sigue siendo CoDi vía Pey.
          </p>
        </div>
      ) : null}
    </div>
  );
}
