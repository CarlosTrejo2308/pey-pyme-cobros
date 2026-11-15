# CobroLibre · Pey PyME Cobros

Merchant-first CoDi charging for Mexican PyMEs: **CobroLibre** UI (Spanish-first, accessible, Mexican visual identity) on a Next.js app that creates **real** Pey CoDi QRs, persists charges in DynamoDB, shares via Twilio WhatsApp trial, and confirms **Pagado** through Pey signed webhooks.

Demo bar: **15 Nov 2026**. Stack: Next.js App Router (TypeScript) on AWS Amplify Hosting + DynamoDB (`us-east-1`).

Live: https://main.d38cqojhxzd9iy.amplifyapp.com

## Features

### Real (P0 — Pey + Dynamo)
- **Inicio** (`/`) — CobroLibre hub, Lupita, tiles, preview of recent charges
- **Cobrar** (`/cobrar`) — amount, concept, optional client/phone/ref → `POST /api/charges`
- **Charge page** (`/c/[id]`) — QR from Pey `qrString`, copy link, WhatsApp send, 2s status poll
- **Ventas** (`/sales`) — recent charges newest-first
- **Demo unlock** (`/unlock`) — `DEMO_ACCESS_TOKEN` → `demo_token` cookie
- **APIs** — charges create/list/get, WhatsApp send, Pey webhook (`/api/webhooks/pey`)

### Demo-only UI (from CobroLibre prototipo; do not move money)
- **Pagar** (`/pagar`) — QR/contacts/voice confirm stub
- **Recurrentes** (`/recurrentes`) — schedule + “autorizó” simulation; **Cobrar hoy** opens real Cobrar
- **Catálogo** (`/catalogo`) — local price list; **Cobrar esto** → real Cobrar
- **Asistente** (`/asistente`) — Lupita chat stub; charge intents deep-link to Cobrar
- **Proyecto** (`/proyecto`) — value prop / what is real

UI adapted from open PR [#1](https://github.com/CarlosTrejo2308/pey-pyme-cobros/pull/1) (`prototipo-cobrolibre/`); the static folder is **not** the product path.

## Setup

### 1. Clone & install

```bash
git clone https://github.com/CarlosTrejo2308/pey-pyme-cobros.git
cd pey-pyme-cobros
npm install
cp .env.example .env.local
```

### 2. Fill `.env.local` (never commit)

| Variable | Purpose |
|----------|---------|
| `PEY_API_KEY` | Bearer for `POST https://api.pey.mx/codi/qr` |
| `PEY_WEBHOOK_SECRET` | Standard Webhooks secret (`whsec_…`) |
| `PEY_BANK_ACCOUNT_ID` | Optional; omit to use API-key linked account |
| `DEMO_ACCESS_TOKEN` | Shared secret for merchant APIs / unlock |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` | Twilio trial |
| `TWILIO_WHATSAPP_FROM` | e.g. `whatsapp:+1…` |
| `TWILIO_WHATSAPP_CONTENT_SID` | Trial template ContentSid |
| `CHARGES_TABLE_NAME` | Default `pey-pyme-charges` |
| `APP_BASE_URL` | Public origin for `shareUrl` (no trailing slash) |
| `DYNAMO_AWS_*` | Prefer on Amplify if `AWS_*` is blocked |

Local AWS credentials (or Amplify bake of Dynamo keys) must allow DynamoDB Get/Put/Update/Query on the table and indexes `gsi1` + `gsi2`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → `/unlock` → Cobrar.

## Demo script

1. Unlock with `DEMO_ACCESS_TOKEN`.
2. **Cobrar** **$0.01** MXN with a short concept.
3. On `/c/[id]`, confirm QR; optionally **Enviar WhatsApp** to a verified E.164.
4. Payer scans QR / pays CoDi in bank app.
5. UI flips to **Pagado** within ~60s (poll every 2s after webhook).
6. Open **Ventas** — newest row shows paid/pending/expired.

## Amplify

`amplify.yml` bakes Hosting env into `.env.production` at build (including `DYNAMO_AWS_*`). No Google Fonts (system stacks) so SSR build stays offline-safe.

## Auth

Merchant routes (`POST/GET /api/charges`, WhatsApp) require Bearer or `demo_token` cookie.  
`GET /api/charges/[id]` and webhook are public (webhook = signature only).
