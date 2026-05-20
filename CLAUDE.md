# CLAUDE.md

Project-specific guidance za Claude Code agenta u ovom repu.

## Što je ovaj repo

**app.domovina.link** = Cloudflare Worker koji brandira self-hosted Coolify
dashboard (`app.domovina.link`) u DOMOVINA boje bez forka Coolify repo-a.

Pristup je "CSS injection via reverse proxy" (option A iz brand diskusije) —
Worker presretne HTML responsove i ubaci `<style>` blok koji override-a
Tailwind v4 CSS varijable koje Coolify koristi.

## Hard-defined odluke

| Odluka | Vrijednost | Razlog |
|---|---|---|
| Stack | Cloudflare Worker, vanilla JS modules | nula deps, HTMLRewriter native |
| Hosting | Cloudflare Workers (route `app.domovina.link/*`) | nema novog servera |
| Brand | navy/red/white iz `donate.domovina.ai/public/styles.css` | canonical DOMOVINA pattern |
| Cilj | minimalan override Coolify primarne palete | preživljava Coolify auto-update |
| Off-limits | fork Coolify repo-a | gubitak auto-update-a, ne isplati se za boje |

## Coolify upstream

- Repo: https://github.com/coollabsio/coolify
- Verzija: v4 (Laravel + Livewire + Tailwind v4)
- Brand boja koju override-amo: `--color-coollabs` (`#6b16ed` purple)
- Boje koje **ne** diramo: `--color-warning`, `--color-success`, `--color-error`
  (semantičke, nose značenje)
- App.domovina.link APP_NAME env var je već postavljen na `DOMOVINA`
  (page title `[DOMOVINA] Coolify` to potvrđuje)

## Konvencije

- Sav korisniku-vidljiv tekst ovdje (README) = hrvatski
- Komentari u kodu — hrvatski (jer su konceptualni)
- HTML/CSS identifiers = engleski (#domovina-brand style ID)
- Commit poruke: konvencionalni commits (`feat:`, `fix:`, `chore:`, `docs:`)

## Što NE raditi

- **Nemoj** kopirati hex vrijednosti — referenciraj `donate.domovina.ai/public/styles.css`.
- **Nemoj** dodavati build step (esbuild, vite). Wrangler radi sve sam.
- **Nemoj** override-ati `--color-warning*`, `--color-success`, `--color-error`
  jer ti tokeni nose semantičko značenje korisniku.
- **Nemoj** mijenjati `--color-coolgray-*` (dark mode neutrals) — to bi
  razbilo dark mode kontrast.
- **Nemoj** pokušavati promijeniti Coolify logo preko ovog Workera. Logo
  uploads idu kroz Coolify Settings UI ili preko env vars na Coolify side.
- **Nemoj** raditi `fetch()` u Workeru s URL-om koji nije isti origin
  (CF doc: same-hostname fetch ne loopa, drugi hostname uvodi extra latency).

## Lokalni dev

```bash
npm install
npx wrangler dev    # localhost:8787, proxia stvarni app.domovina.link
```

## Deploy

```bash
npx wrangler login           # prvi put
npx wrangler deploy
npx wrangler tail            # live logs
```

## Iteriranje na brandu

Mijenjati samo `src/brand-css.js`. Sve ostalo (Worker logic, routes) ne
treba dirati. Nakon edita: `npx wrangler deploy` + hard refresh u browseru
(Cmd+Shift+R) da pukne CSS bundle cache.

## Granice ovog pristupa

CSS injection ne može pokriti:
- Direktne hex usage-e u Coolify CSS-u (13 selektora s `#fcd452`)
- Logo SVG-ove (statički asseti)
- Email template-e koje Coolify šalje (out-of-band)

Ako brand zahtjevi prerastu CSS injection → prelaziš na option B
(fork + custom Docker image, vidi diskusiju u kontekstu).
