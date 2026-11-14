"use client";

import { QRCodeSVG } from "qrcode.react";

export function QrDisplay({
  qrString,
  size = 240,
}: {
  qrString: string;
  size?: number;
}) {
  if (!qrString) {
    return (
      <div className="qr-placeholder" role="status">
        Sin datos de QR
      </div>
    );
  }

  return (
    <div className="qr-frame" aria-label="Código CoDi">
      <QRCodeSVG value={qrString} size={size} level="M" includeMargin />
    </div>
  );
}
