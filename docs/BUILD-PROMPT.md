# Build Prompt — Ayomide & Opeyemi Wedding Website

> **How to use this document.** It is written to work two ways. Handed to a developer (human or AI), it is a
> complete build spec — no further questions should be needed to produce the site. Pasted into an AI site builder
> (Figma Make, Lovable, v0, Bolt), it is a single prompt. Everything is prescriptive on purpose: the point of this
> brief is that two people following it produce the same site.

---

## 1. The project, and the non-negotiables

Build a wedding website for **Ayomide & Opeyemi**, marrying **Saturday, 26 September 2026 at 12:00 noon** in
Ifako-Ijaiye, Lagos, Nigeria. Their hashtag is **#AYOYEMIALWAYS&4VER** and their monogram is **AO**.

The site has two jobs of roughly equal weight. First, be a beautiful digital invitation that guests will open on a
phone from a WhatsApp link. Second, be the place guests actually **send money** — the printed invitation says
*"MONETIZE ALL GIFTS"*, which in Nigerian wedding convention means cash rather than physical presents. The gift
section is not a footnote here. It is half the site.

### Non-negotiables

1. **Mobile first, always.** The overwhelming majority of guests will arrive on a phone via WhatsApp. Design at
   390px and scale up. If a decision looks better on desktop but worse on mobile, mobile wins.
2. **Every name, title, address, and phone number must match the printed card exactly.** See §2. Honorifics are not
   decoration in this context — *Evang.*, *Apostle*, *Pst Mrs*, and *Late Mrs* each carry meaning and each must
   survive to the rendered page intact.
3. **A reference site exists, and this is not a copy of it.** `https://margin-kind-63980187.figma.site/` was the
   starting inspiration. **Do not reuse its dark navy-and-gold palette, its falling-rose-petal motif, or its
   typefaces (Playfair Display, Pinyon Script, Cinzel Decorative, Raleway).** Those three things are its signature.
   This site's palette is light, its ambient motion is bokeh-and-bloom, and its typefaces are named in §3.
4. **No payment processor.** No Paystack, no Flutterwave, no card fields, no Stripe. Gifts are bank transfers with
   one-tap copy. Nothing about money is stored or transmitted by this site.
5. **Content lives in one file.** `data/wedding.ts` is the entire editing surface. A non-developer should be able to
   change a bank account number, add a gift item, or reword an FAQ answer without opening a component.

### Explicit non-goals

No payment processing. No user accounts or login. No per-guest personalised invite links. No blog or news feed.
No CMS. No admin dashboard. No live-streaming page. No seating chart. Resist all of these.

---

## 2. Content inventory — verbatim from the printed invitation

This is the source of truth. Reproduce it faithfully.

**Families**

> The families of
> **Evang. Olatunji and Late Mrs Abosede Israel Eweje**
> &
> **Apostle Bamidele & Pst Mrs Kemi Olaide Ogunbore**

**The invitation line**

> Cordially invites your presence to the **Wedding Ceremony** of their children

**The couple** — **Ayomide** & **Opeyemi**

**Date and time** — **26th Sept. 2026**, **12PM**
*(Derive the weekday programmatically rather than typing it — it is a Saturday, but let the date utility prove it.)*

**Ceremony venue**

> **The City of the Lord Church**
> 25, Kudirat Soule Str, off Coker Rd Orimolade Bus-stop,
> College Road, Ifako-Ijaiye, Lagos

**Reception** — *Reception follows immediately at:*

> **Lagos African Church Grammar School (LAFRO)**
> College Bus stop, Ifako-Ijaiye, Lagos

**Colour of the day** — **Blush Pink** and **Champagne** (show as actual swatches, not just words)

**RSVP** — **+234 906 665 5494** · **+234 703 064 2133**

**Two standing notices** — **Monetize all gifts** · **Adults only, no kids**

**Hashtag** — **#AYOYEMIALWAYS&4VER**

**The QR code** on the printed card is labelled *"map to the hall."* Until the exact pin is supplied, default the
map links to Google Maps search URLs built from the addresses above:

```
https://www.google.com/maps/search/?api=1&query=The+City+of+the+Lord+Church%2C+25+Kudirat+Soule+Street%2C+Ifako-Ijaiye%2C+Lagos
https://www.google.com/maps/search/?api=1&query=Lagos+African+Church+Grammar+School+LAFRO%2C+College+Road%2C+Ifako-Ijaiye%2C+Lagos
```

Both live in `data/wedding.ts` so they can be swapped for exact pins later.

---

## 3. Art direction — Blush & Champagne

The printed card is warm ivory washed with blush pink, deep wine-red lettering, champagne, and gold rings. The site
takes that palette and gives it air. Think **wedding stationery, not nightclub flyer**: generous white space,
hairline rules, high-contrast serif display type, and colour used sparingly enough that when it appears it means
something.

### Tokens

| Token | Hex | Use |
|---|---|---|
| `ivory` | `#FFFBF8` | Page ground. The default. |
| `blush-50` | `#FDF1F0` | Alternate section wash, to separate bands without borders |
| `blush-200` | `#F7D9DA` | Card fills, dividers, chip backgrounds |
| `blush-400` | `#F2A6AC` | Accent — matches the printed "Blush Pink" swatch |
| `champagne` | `#F3D7B4` | Second printed swatch; fund-card fills |
| `gold` | `#C9A24B` | Hairline rules, ornaments, focus rings |
| `wine` | `#8E1B2E` | Headings, primary buttons |
| `wine-deep` | `#6B1222` | Hover states, footer ground |
| `ink` | `#3A2226` | Body copy — a warm near-black, never pure `#000` |
| `muted` | `#8A6B70` | Captions, field labels, secondary text |

**Rules for using them.** Gold appears only as hairlines, small ornaments, and focus rings — **never as a fill and
never as body text** (it fails contrast). Blush-400 is an accent, not a text colour. Wine carries every heading and
the primary button. Body copy is always `ink` on `ivory` or `blush-50`. At most one blush wash band may touch
another — three in a row and the page turns pink.

### Typography

Load via `next/font/google`.

- **Cormorant Garamond** — display and headings. Weights 300, 400, 600, plus italic. High-contrast, elegant, and
  deliberately *not* Playfair.
- **Italianno** — a single flowing script, used for **at most three words on the entire site**. Suggested: the
  ampersand between the names in the hero, the word *Forever* in the countdown eyebrow, and nothing else. Script
  used more than that stops being special.
- **Jost** — all UI: buttons, labels, form fields, navigation, and eyebrow text (uppercase, `0.18em` tracking).

**Scale** (mobile → desktop, use `clamp()`):

| Role | Size |
|---|---|
| Hero names | `clamp(48px, 13vw, 104px)` Cormorant 300 |
| Section heading | `clamp(30px, 7vw, 52px)` Cormorant 400 |
| Subheading | `clamp(20px, 4.5vw, 28px)` Cormorant 400 italic |
| Eyebrow | `clamp(10px, 2.4vw, 12px)` Jost 500 uppercase, `0.18em` tracking |
| Body | `clamp(15px, 3.6vw, 17px)` Jost 400, line-height 1.7 |
| Caption | `13px` Jost 400, `muted` |

### Ornament

One recurring motif, used as the section separator throughout: a **gold hairline rule with a small diamond or
four-point star at its centre** — `——— ✦ ———`. It draws itself in when the section enters view (§4). This single
repeated ornament is what makes the site feel like one designed object rather than a stack of blocks.

The **AO monogram** from the card appears exactly twice: once in the hero, once in the footer.

---

## 4. Motion — bokeh and bloom

The reference site's signature is falling rose petals. **This site does not use falling petals.** Its motion
signature is two things:

**`<Bokeh />`** — soft, out-of-focus light. 18–24 circles filled with radial gradients in `blush-400` and
`champagne`, each `blur(20–40px)`, opacity `0.12–0.28`, diameter 60–220px. They drift slowly **upward** with a
gentle lateral sine wobble, on 40–90 second loops with randomised delays. `position: fixed`, behind all content,
`pointer-events: none`. Cap the count on mobile (12) and pause the animation when the tab is hidden.

**`<Bloom />`** — the section reveal. Content washes into view the way ink blooms on wet paper: an expanding
`clip-path` circle or mask paired with an opacity and slight `translateY` lift. Duration `0.9s`, easing
`[0.22, 1, 0.36, 1]`, triggered by `whileInView` with `once: true` and a `-80px` root margin.

**Supporting motion.** The `——— ✦ ———` rules draw themselves with `scaleX: 0 → 1` from the centre. Countdown
numerals roll when they change. Buttons lift 2px on hover with a 200ms ease. Nothing else moves.

**Reduced motion.** Under `prefers-reduced-motion: reduce`, bokeh does not render at all, blooms become a plain
150ms opacity fade, rules appear at full width, and numerals swap without rolling. This is a hard requirement, not
a nicety.

**Never.** No scroll-jacking, no parallax that fights the scroll, no auto-playing audio, no entrance animation that
delays content by more than 900ms, no element that animates forever inside the reader's field of view while they
are trying to read text.

---

## 5. Sections

Twelve sections, one page, anchor navigation. A slim sticky header appears after the hero scrolls past: monogram on
the left, anchor links centre (desktop) or a sheet menu (mobile), and a persistent **Send a Gift** button on the
right in `wine`.

### 1 — Hero

Full viewport. Ivory ground with a blush wash bleeding in from the top-left and bottom-right corners, bokeh behind.
The **AO** monogram at top. Then the eyebrow *"together with their families"*, the names set large in Cormorant 300
with the Italianno ampersand between them, the `——— ✦ ———` rule, and the line
**26 · 09 · 2026  ·  Ifako-Ijaiye, Lagos**. The hashtag **#AYOYEMIALWAYS&4VER** sits beneath in Jost uppercase.

Two buttons: **RSVP** (solid wine) and **Send a Gift** (outlined gold). A quiet scroll cue at the base.

If a couple photo is available, it may sit as a soft-edged portrait beside the names on desktop — but the hero must
be complete and beautiful with type alone, because photos may arrive late.

### 2 — Countdown

Target: **2026-09-26T12:00:00+01:00** (Africa/Lagos). Must compute correctly regardless of the visitor's timezone —
build the target as a fixed UTC instant, do not use local-time constructors.

Four units — Days, Hours, Minutes, Seconds — as large Cormorant numerals over small Jost uppercase labels,
separated by thin gold rules. Eyebrow above reads *"counting down to"* with *Forever* in Italianno.

Handle the edges: on the day itself show **"Today"**; after the ceremony has begun show a warm past-tense line
(*"Married — 26 September 2026"*). Never show negative numbers.

### 3 — The Invitation

The centrepiece, styled like the printed card. Centred, generous margins, on a `blush-50` wash.

> *The families of*
> **Evang. Olatunji and Late Mrs Abosede Israel Eweje**
> *&*
> **Apostle Bamidele & Pst Mrs Kemi Olaide Ogunbore**
> *cordially invite your presence to the*
> **Wedding Ceremony**
> *of their children*
> **Ayomide & Opeyemi**

A quiet scripture line may close the section — one verse, small, in Cormorant italic, `muted`. Both families are
clergy; a light touch of scripture belongs here and reads as natural rather than imposed.

### 4 — Our Story

A vertical timeline of 3–5 moments — how they met, the proposal, the day itself — each a small heading, a date, and
two or three sentences, connected by a gold hairline with a small node at each entry. Alternating left/right on
desktop, single column on mobile.

**The real copy has not been supplied yet.** Write warm, faith-forward placeholder text in the correct voice and
mark each block clearly with a `TODO` comment in `data/wedding.ts` so it is obvious what needs replacing. Do not
invent specific factual claims — no invented meeting places, dates, or proposal locations. Keep placeholders
gracious and general.

### 5 — The Day

Two cards side by side on desktop, stacked on mobile.

**Ceremony** — 12:00 PM · The City of the Lord Church · 25, Kudirat Soule Str, off Coker Rd Orimolade Bus-stop,
College Road, Ifako-Ijaiye, Lagos · **Open in Maps** button.

**Reception** — *Follows immediately* · Lagos African Church Grammar School (LAFRO) · College Bus stop,
Ifako-Ijaiye, Lagos · **Open in Maps** button.

Beneath both, render the map QR code so guests can point a second phone at the screen — reproducing the printed
card's affordance. Generate it from the maps URL rather than cropping the card image, so it stays sharp.

### 6 — Details

Three or four small cards on a `blush-50` band:

- **Colour of the day** — the words *Blush Pink* and *Champagne* each beside a real filled swatch (`blush-400`,
  `champagne`), matching the printed card's presentation.
- **Adults only** — *"We love your little ones, but this celebration is for adults only. No kids, please."*
- **Gifts** — one warm sentence noting all gifts are monetized, with a link down to the gift table.
- **Getting there** — a short note on the College Bus stop landmark and parking.

### 7 — Gallery

A responsive masonry or 3-column grid of couple photos with a keyboard-accessible lightbox (arrow keys, Escape,
focus restore on close). If no photos are supplied, the section hides itself entirely rather than rendering empty
frames — drive this off the array length in `data/wedding.ts`.

### 8 — The Gift Table

See §6 — this is specified in full below.

### 9 — Love Funds

See §6.

### 10 — Transfer Sheet

See §6. Not a section — a modal opened from §8, §9, and the header button.

### 11 — RSVP

Fields: **Full name** (required), **Phone** (required), **Email** (optional), **Attending** (Ceremony / Reception /
Both / Unable to attend), **Number of adults** (1–10 — the label must reinforce adults only), **Message to the
couple** (optional, 500 char limit).

Submits to `/api/rsvp`, which forwards to a Google Apps Script web app that appends a row to a Google Sheet.
Inline validation with clear messages, a disabled-with-spinner state during submit, a warm confirmation on success,
and a real error state on failure that tells the guest to call the RSVP numbers instead. Never silently fail.

Below the form, both RSVP numbers as tap-to-call links, for guests who would rather just ring.

### 12 — Footer

On a `wine-deep` ground with ivory text: the AO monogram, the hashtag, both RSVP numbers as tap-to-call, a
**Download the invitation** link serving the original card image, and a closing line. A single gold hairline
separates it from the page.

---

## 6. The gift hub — the part that matters

The printed card says **MONETIZE ALL GIFTS**. Guests will not all know what that means or what to do about it, and
the ones who do will be doing it on a phone, one-handed, at a reception. Every decision here optimises for
*"how few taps until the money has moved?"*

The answer is: **two.** Tap a gift → tap copy on the account number. Everything else is supporting material.

### The framing

Open the section warmly, never transactionally:

> **The Gift Table**
> *Your presence is the gift. But if you would like to bless our new home, the couple have asked that all gifts be
> sent as cash — it lets them choose exactly what their home needs.*

That last clause matters. It explains *why* the couple asked for money, which is the thing guests are quietly
wondering.

### Item card

A grid, 1 column mobile / 2 tablet / 3 desktop. Each card:

- Photo, 4:3, rounded, on `blush-200`
- Category chip in Jost uppercase — *Kitchen*, *Living*, *Power*, *Laundry*
- Item name in Cormorant
- Target amount in ₦, formatted with `Intl.NumberFormat('en-NG')`
- Optional progress bar — only rendered if a `contributed` figure exists for that item, so the couple can leave it
  off entirely. If shown, the label is *"₦X of ₦Y received"*, and a fully-funded item gets a gold **Fully blessed**
  ribbon and a de-emphasised card.
- Primary action: **Monetize this gift** → opens the transfer sheet with this item pre-selected

Seed the list with a sensible Nigerian home-starter set the couple can freely edit: deep freezer, washing machine,
generator, standing fan, microwave, gas cooker, granite pot set, dinnerware set, knife set, electric kettle, dish
rack, pressing iron, Bluetooth speaker, smart television, air fryer, blender. Every one of these is a placeholder —
say so plainly in `data/wedding.ts`.

### Fund card

Five milestone funds on a `champagne` wash, visually distinct from item cards — wider, no photo, an ornament
instead — so the two ideas do not blur:

| Fund | Line |
|---|---|
| **Honeymoon** | For a few quiet days to breathe, and a view neither of them has seen before. |
| **New Home** | For the first keys, the first meals, and the rooms they will make their own. |
| **Home Furnishing** | For the sofa, the curtains, and everything that turns a house into theirs. |
| **Car** | For the journeys, the errands, and the everyday movement of a shared life. |
| **Bless Us** | For anything at all. Give what is on your heart. |

Action: **Support this fund** → opens the transfer sheet with the fund pre-selected.

### The transfer sheet

A modal on desktop, a bottom sheet on mobile. This is the most important component on the site — build it carefully.

Contents, in order:

1. **What you are giving toward** — the item or fund name, with its photo or ornament. If opened from the header
   button instead of a card, show a small select so the guest can choose, defaulting to *Bless Us*.
2. **One line of framing** — *"All gifts are received as bank transfers. Thank you for blessing this home."*
3. **The account block** — the whole point. Account name, bank, and account number, each on its own row:
   - The account number set large in a **tabular-figure** font, grouped for legibility (`0123 456 789`)
   - A **copy button on every row**, each with its own confirmed state (*Copied* + check, reverting after ~2s)
   - Use the async Clipboard API with a `document.execCommand` fallback, because Nigerian guests on older Android
     browsers are a real and significant slice of this audience
4. **Reference** — pre-filled with the item or fund name, also copyable. Explain in one line why it matters: it is
   how the couple know what the gift was for.
5. **International accounts** — an optional second block for guests abroad, rendered only if populated in
   `data/wedding.ts`. Hidden entirely when empty; never render a stub.
6. **"I've sent my gift"** — opens WhatsApp to the first RSVP number with a pre-filled message:
   `Hello! I've just sent a gift for [item/fund name]. — [guest may add their name]`
   This is the couple's only notification channel, since nothing is stored server-side. It must be prominent.
7. **The anti-impostor notice** — small, calm, and mandatory:
   > *These are the only accounts for this wedding. If anyone sends you different details, please call
   > +234 906 665 5494 to confirm before sending anything.*

   Publishing bank details on a public page invites cloned pages and intercepted screenshots. This line costs one
   sentence and is the single highest-value thing on the sheet. **Do not omit it.**

**Behaviour.** Focus moves into the sheet on open and returns to the triggering button on close. Escape closes. The
background scroll locks. Focus is trapped while open. The sheet is a `<dialog>` or has `role="dialog"` with
`aria-modal="true"` and an `aria-labelledby` pointing at its title. Copy confirmations announce via an
`aria-live="polite"` region — a colour change alone is not feedback for everyone.

**Never.** No card number fields. No amount field that implies the site will charge anything. No third-party
payment script. No storing of anything a guest types.

---

## 7. Data contract

`data/wedding.ts` is the only file a non-developer should ever need to open. Every unsupplied value carries a
`TODO` comment naming what is missing and who supplies it.

```ts
export const wedding = {
  couple: { bride: 'Ayomide', groom: 'Opeyemi', monogram: 'AO', hashtag: '#AYOYEMIALWAYS&4VER' },

  // Fixed UTC instant. Lagos is UTC+1 year-round (no DST).
  ceremonyAt: '2026-09-26T11:00:00.000Z',

  families: {
    bride: 'Evang. Olatunji and Late Mrs Abosede Israel Eweje',
    groom: 'Apostle Bamidele & Pst Mrs Kemi Olaide Ogunbore',
  },

  venues: {
    ceremony: { name: 'The City of the Lord Church', address: '...', time: '12:00 PM', mapsUrl: '...' },
    reception: { name: 'Lagos African Church Grammar School (LAFRO)', address: '...',
                 time: 'Follows immediately', mapsUrl: '...' },
  },

  rsvpPhones: ['+2349066655494', '+2347030642133'],
  colours: [{ name: 'Blush Pink', hex: '#F2A6AC' }, { name: 'Champagne', hex: '#F3D7B4' }],

  bank: {
    // TODO(couple): supply real details before launch
    accountName: 'TODO', bankName: 'TODO', accountNumber: 'TODO',
    international: null,        // or { accountName, bank, iban, swift, currency }
  },

  giftItems: [ { id, name, category, targetNaira, imageUrl, contributedNaira? } ],
  funds:     [ { id, name, blurb, ornament } ],
  story:     [ { id, title, when, body } ],   // TODO(couple): replace placeholder copy
  gallery:   [ { src, alt } ],                 // empty array hides the section
  faq:       [ { q, a } ],
} as const
```

Amounts are stored as **integer naira**, never floats, and formatted only at the render boundary.

---

## 8. Technical requirements

**Stack** — Next.js (App Router) + TypeScript + Tailwind + Framer Motion. Fonts via `next/font/google`. Images via
`next/image`. Deploy to Vercel.

**RSVP path** — the browser posts to `app/api/rsvp/route.ts`, which forwards to the Google Apps Script web app URL
held in the `RSVP_ENDPOINT` env var. This keeps the endpoint out of the client bundle and sidesteps CORS entirely.
The route validates input server-side too, and returns a clean `{ ok, error? }`. Document the Apps Script itself in
`docs/APPS-SCRIPT.md` with the sheet's column order.

**Accessibility** — WCAG AA. Verify contrast on every blush and champagne surface (`blush-400` and `champagne` are
decorative, and text must not sit directly on them at small sizes). Visible gold focus rings on every interactive
element. All form fields properly labelled with errors tied via `aria-describedby`. Full keyboard path through
nav → gift table → transfer sheet → RSVP → footer. Real alt text on every image. `prefers-reduced-motion` fully
honoured.

**Performance** — Lighthouse ≥ 90 on mobile. Bokeh capped and paused when hidden. Gallery images lazy-loaded below
the fold, hero image priority-loaded. Font subsetting on. Many guests will be on constrained Nigerian mobile data —
treat every kilobyte in the hero as expensive.

**SEO / sharing** — Title `Ayomide & Opeyemi · 26 September 2026`. Description one warm sentence. **The OG image
matters more than anything else in this list**: this link will be pasted into WhatsApp hundreds of times, and the
preview card is the first thing most guests will ever see of it. Derive it from the invitation card artwork at
1200×630. Set `og:` and `twitter:` tags, and a favicon from the AO monogram.

**Browser support** — Modern evergreen browsers plus Android WebView going back a few versions. Clipboard, `<dialog>`,
and `clip-path` all need graceful fallbacks. Test on a real mid-range Android phone if one is available.

---

## 9. Voice

Warm and faith-forward. Both families are clergy — an Evangelist, an Apostle, and a Pastor — and the ceremony is in
a church. Scripture and the language of covenant, grace, and thanksgiving belong here and will read as natural.

But keep it light. One verse per section at most, and only where it genuinely lands. The register to aim for is a
gracious, joyful invitation written by people who mean it — not a liturgy, and not a marketing page. Warm, plain,
generous. Short sentences. No exclamation marks except in the confirmation message after a guest RSVPs.

---

## 10. Definition of done

- [ ] Every name, honorific, address, and phone number verified character-by-character against the card image
- [ ] Countdown correct from a browser set to a non-Lagos timezone; "Today" and past states both verified
- [ ] Transfer sheet reachable in two taps from the hero; copy buttons verified on a real phone
- [ ] Anti-impostor notice present in the transfer sheet
- [ ] RSVP submission lands a complete row in the Google Sheet; validation and failure states both verified
- [ ] `prefers-reduced-motion` disables bokeh and reduces blooms to fades
- [ ] Keyboard-only pass completes; Axe reports no violations
- [ ] Lighthouse mobile ≥ 90 across the board
- [ ] The deployed URL pasted into WhatsApp renders the OG preview card correctly
- [ ] No falling petals, no navy-and-gold, no Playfair/Pinyon/Cinzel anywhere in the codebase
