# Celebration sites

One repository, one folder per couple. Each folder is a complete, independent
Next.js site with its own `package.json`, content, photographs and README —
nothing is shared between them, so changing one can never break another.

Folders are named by the couple's initials.

| Folder | Couple | Occasion |
|---|---|---|
| [`A&O/`](A%26O/) | Ayomide & Opeyemi | Wedding — 26 September 2026 |
| [`O&A/`](O%26A/) | Oluwabunmi & Anuoluwapo | Engagement ceremony — 5 December 2026 |

## Working on a site

Go into its folder and use pnpm from there. The `&` means the folder name must
be quoted in a terminal:

```bash
cd "O&A"
pnpm install
pnpm dev
```

Stay on **pnpm**: the `&` breaks the Windows command shims that npm and npx
use. Each folder's own README has the details, and covers its content,
photographs and deployment.

## Adding the next couple

1. Copy the most recent folder to a new one named with the couple's initials:
   `cp -r "O&A" "X&Y"`. Leave `node_modules` and `.next` behind — run
   `pnpm install` in the new folder instead. If two couples share initials,
   add something to tell them apart (`A&O-2027`).
2. Rewrite `data/wedding.ts`, replace the photographs, and give it its own
   `.env.local` with **its own RSVP sheet** (see `docs/APPS-SCRIPT.md` in the
   folder). Never reuse another couple's `RSVP_ENDPOINT`.
3. Add a row to the table above.

## Deploying

Each site is its own project on the host. Because the sites no longer sit at
the top of the repository, every project must be told which folder to build:
on Vercel, **Settings → Build and Deployment → Root Directory**, set to the
couple's folder name (`O&A`). A project still pointed at the repository root
will fail to build.
