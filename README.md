# Pey PyME Cobros (P0)

Merchant-first CoDi charging for Mexican PyMEs: create a charge, show a dynamic QR, send a Twilio WhatsApp trial template, confirm **Pagado** via Pey signed webhooks, and list recent sales.

Demo bar: **15 Nov 2026**. Stack: Next.js App Router (TypeScript) on AWS Amplify Hosting + DynamoDB (`us-east-1`).

## Features (P0)

- **Cobrar** (`/`) — amount, concept, optional ≤7-digit reference
- **Charge page** (`/c/[id]`) — QR from Pey `qrString`, copy link, WhatsApp send, 2s status poll
- **Sales** (`/sales`) — recent charges newest-first
- **Demo unlock** (`/unlock`) — `DEMO_ACCESS_TOKEN` → `demo_token` cookie
- **APIs** — charges create/list/get, WhatsApp send, Pey webhook (`/api/webhooks/pey`) with Standard Webhooks verify

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

Local AWS credentials (or Amplify role in deploy) must allow DynamoDB Get/Put/Update/Query on the table and indexes `gsi1` + `gsi2`.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → `/unlock` with your demo token → Cobrar.

```bash
npm run build && npm start
```

## DynamoDB (when AWS is ready)

Table **`pey-pyme-charges`** · on-demand · `us-east-1`

- PK: `chargeId` (String)
- GSI **`gsi1`**: `gsi1pk` / `gsi1sk` (sales list)
- GSI **`gsi2`**: `gsi2pk` / `gsi2sk` (webhook lookup by Pey QR id)

Amplify compute IAM needs read/write on the table **and both GSIs**. See project infra design for the policy sketch.

## Amplify Hosting notes

1. Connect this GitHub repo, branch `main`, Next.js SSR (**WEB_COMPUTE**).
2. Optional: repo includes `amplify.yml` (`npm ci` → `npm run build`).
3. Set the same env var **names** as `.env.example` in Amplify → Environment variables.
4. Attach DynamoDB policy to the Amplify SSR/compute role.
5. After first green deploy, set `APP_BASE_URL` to `https://main.<app-id>.amplifyapp.com` and redeploy.
6. **Then** register Pey webhook (manual, not automated in P0):  
   `https://main.<app-id>.amplifyapp.com/api/webhooks/pey`

Webhook registration is deferred until the Amplify URL exists.

## Demo script (15 Nov)

1. Join Twilio WhatsApp trial; verify demo recipient phones (max 5).
2. Unlock with `DEMO_ACCESS_TOKEN`.
3. Cobrar **$0.01** MXN with a short concept.
4. On `/c/[id]`, confirm QR renders; optionally **Enviar WhatsApp** to a verified E.164.
5. Payer scans QR / pays CoDi in bank app.
6. UI flips to **Pagado** within ~60s (poll every 2s after webhook).
7. Open `/sales` — newest row shows paid/pending/expired.

### Twilio trial reminders

- Send only to **verified** numbers.
- P0 sends **ContentSid only** (no `Body` / `MediaUrl` / `ContentVariables`).
- Payment link + QR live on `/c/[id]`; WhatsApp proves the channel.

## Auth

Merchant routes (`POST/GET /api/charges`, WhatsApp) require:

- `Authorization: Bearer <DEMO_ACCESS_TOKEN>`, or
- Cookie `demo_token` set by `/unlock`

`GET /api/charges/[id]` and `POST /api/webhooks/pey` do **not** use demo auth. Webhooks use signature verify only.

## Repo layout

Matches the P0 LLD module map: `app/`, `components/`, `lib/`, `types/`.

## Out of scope (this P0 code drop)

- Provisioning Amplify / DynamoDB / IAM (done in AWS console when access is ready)
- Automatic Pey webhook portal registration
- Production WhatsApp Business / multi-merchant Cognito
