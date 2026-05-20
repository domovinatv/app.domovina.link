# app.domovina.link

Cloudflare Worker koji brandira self-hosted Coolify dashboard na
`app.domovina.link` u DOMOVINA boje **bez foreva Coolify repo-a**.

## Kako radi

1. DNS za `app.domovina.link` je proxied (orange-cloud) kroz Cloudflare.
2. Worker je vezan na route `app.domovina.link/*` (vidi `wrangler.toml`).
3. Worker dohvaća origin response (Coolify server).
4. Ako je content-type `text/html`, ubacuje `<style id="domovina-brand">`
   u `<head>` koristeći HTMLRewriter API.
5. Sve ostalo (CSS, JS, WebSocket, SSE, JSON) prolazi pass-through.

CSS overridea Tailwind v4 varijable `--color-coollabs*` koje Coolify
koristi za primarne brand boje. Semantičke boje (warning/success/error)
ostaju netaknute.

## Brand tokeni

Source of truth: `donate.domovina.ai/public/styles.css`.

| Token | DOMOVINA |
|---|---|
| Primary | `#002F6C` (navy) |
| Accent | `#FF0000` (red) |
| Surface | `#FFFFFF` (white) |
| Muted | `#5A6570` |

## Lokalni dev

```bash
npm install
npx wrangler dev
# Worker dostupan na localhost:8787, proxia stvarni app.domovina.link
```

## Deploy

```bash
npx wrangler login            # prvi put
npx wrangler deploy           # gura na CF
npx wrangler tail             # live logs
```

Ili preko CF dashboarda: Workers & Pages → Create → Upload `src/`.

## Disable / rollback

U CF dashboardu: Workers & Pages → `app-domovina-link-brand` →
Settings → Triggers → ukloni route. Coolify se nastavi servirati
neproxied (samo bez DOMOVINA brand-a).

## Što ovaj Worker NE radi

- Ne mijenja logo (Coolify već koristi env `APP_NAME=DOMOVINA`).
- Ne mijenja semantičke boje warning/success/error.
- Ne pokriva direktne hex usage-e u 13 specifičnih Coolify pravila
  (npr. `box-shadow:inset 4px 0 #fcd452`). Te se mogu adresirati kasnije
  s eksplicitnim CSS overrideovima.
- Ne dira WebSocket (terminal, log streamovi rade normalno).

## Licenca

MIT.
