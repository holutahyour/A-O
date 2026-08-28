# Ayomide & Opeyemi

The wedding website for Ayomide and Opeyemi — Saturday, 26 September 2026,
The City of the Lord Church, Ifako-Ijaiye, Lagos.

`#AYOYEMIALWAYS&4VER`

## Running it

This project uses **pnpm**. If you do not have it: `npm install -g pnpm`.

```bash
pnpm install
pnpm dev             # http://localhost:3000
pnpm build           # production build
pnpm typecheck       # types only
pnpm start -p 3100   # serve the production build
```

> **Two notes on this folder's name.**
>
> The `&` in `A&O` breaks the Windows command shims that **npm** and **npx** use —
> `npm run build` fails here with a confusing "not recognized as an internal or
> external command" error. **pnpm handles it correctly**, which is one practical
> reason to stay on pnpm in this folder. If you ever need to fall back to npm,
> call the tools through node directly instead:
>
> ```bash
> node ./node_modules/next/dist/bin/next build
> node ./node_modules/typescript/bin/tsc --noEmit
> ```
>
> Also note pnpm passes extra arguments straight through, so **do not use `--`**:
> write `pnpm start -p 3100`, not `pnpm start -- -p 3100` (the latter passes a
> literal `--` to Next and it exits with "Invalid project directory").

## Editing the content

**Everything the site says lives in [`data/wedding.ts`](data/wedding.ts).** Names,
dates, venues, phone numbers, bank details, the gift list, the funds, the story,
and the FAQ. You should never need to open a component to change a word.

Anything still marked `TODO(couple)` needs real information:

| What | Where |
|---|---|
| Bank account name, bank, and number | `bank` |
| The real love story | `story` |
| Final gift list and prices | `giftItems` |
| Exact map pins from the card's QR code | `venues.*.mapsUrl` |
| Google Apps Script URL for RSVP | `.env.local` — see [docs/APPS-SCRIPT.md](docs/APPS-SCRIPT.md) |

The site works today with all of these unset. The gift sheet shows a
"details coming soon" notice with the RSVP numbers instead of broken
placeholders, and the RSVP form tells guests to call rather than pretending a
submission was saved.

## How it is put together

- **Next.js 16** (App Router) + TypeScript + Tailwind 4 + Framer Motion
- **No database, no payment processor, no accounts.** Gifts are bank transfers
  with one-tap copy. RSVPs go to a Google Sheet through `/api/rsvp`.
- **`app/opengraph-image.tsx`** draws the WhatsApp link preview at 1200×630. This
  link will be shared on WhatsApp far more than anywhere else, so the preview
  card is drawn properly rather than letting a portrait photo get cropped.

## The design

Blush and champagne, taken from the printed invitation card — warm ivory ground,
deep wine headings, champagne-gold hairlines. The ambient motion is drifting
bokeh with watercolour "bloom" reveals, and the type is Cormorant Garamond with
Italianno for a handful of script flourishes.

The full brief is in [docs/BUILD-PROMPT.md](docs/BUILD-PROMPT.md).

## Deploying

Push to Vercel. It detects pnpm from `pnpm-lock.yaml` and from the
`packageManager` field in `package.json`, so no build-command override is needed
— **commit the lockfile.**

Set two environment variables:

- `RSVP_ENDPOINT` — the Apps Script web app URL
- `NEXT_PUBLIC_SITE_URL` — the final public URL, so link previews resolve

## Licences

The bundled Cormorant Garamond used by the link-preview image is under the SIL
Open Font License — see [assets/fonts/OFL.txt](assets/fonts/OFL.txt).
