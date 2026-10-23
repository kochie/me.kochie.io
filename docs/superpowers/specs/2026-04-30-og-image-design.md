# OpenGraph Image — Design Spec

**Date:** 2026-04-30
**Status:** Approved, ready for implementation plan
**Owner:** Robert Koch

## Goal

Replace the static `/images/AirplaneMaker.jpg` OpenGraph image with a dynamically generated card that mirrors the site's broadsheet design language and renders the hero quote as the headline. The new card lives as code in the repo so it stays in sync with the design system and can be extended to per-route variants later.

## Decisions Locked

| Decision | Choice |
|---|---|
| Visual direction | "The Hook" — hero quote as magazine cover |
| Theme | Light (paper `#faf6ec`, ink `#171311`, wheat `#d9b67a`) |
| Implementation | Dynamic — `app/opengraph-image.tsx` via Next.js `ImageResponse` |
| Dimensions | 1200×630 (X / LinkedIn / iMessage standard) |
| Fonts | Fraunces Italic (display) + JetBrains Mono Regular (eyebrow/meta) |
| Twitter card | Reuses `og:image` (no separate `twitter-image.tsx`) |

## Layout

```
1200×630, paper background (#faf6ec), ink foreground (#171311)
Padding: ~84px horizontal, ~41px vertical (7% / 6.5%)

┌──────────────────────────────────────────────────────────┐
│  ── Robert Koch · Melbourne                              │  ← JetBrains Mono 500
│                                                          │     20px, tracking 0.22em
│                                                          │     uppercase
│       I build things,                                    │  ← Fraunces Italic 400
│       write the code for them,                           │     ~92px, line-height 0.95
│       & run from the                                     │     letter-spacing -0.02em
│       resulting explosion.                               │  ← "resulting explosion"
│                                                          │     in wheat (#d9b67a)
│                                                          │
│  Engineer · Speaker · Guitarist          me.kochie.io    │  ← JetBrains Mono 500
│                                                          │     20px, opacity 0.78
└──────────────────────────────────────────────────────────┘
```

Three-row vertical layout via flexbox `justify-content: space-between`:

1. **Top eyebrow** — short rule + identity line ("Robert Koch · Melbourne")
2. **Middle hook** — the hero quote, four lines, italic Fraunces, with the final phrase "resulting explosion" in wheat
3. **Bottom meta** — "Engineer · Speaker · Guitarist" left-aligned, "me.kochie.io" right-aligned

## Architecture

**File convention:** Next.js App Router auto-wires `app/opengraph-image.tsx` to `<meta property="og:image">` for the entire app. No manual metadata config required for the image itself.

**Files to create:**

```
src/app/opengraph-image.tsx         ← async default export → ImageResponse
src/app/Fraunces-Italic.ttf         ← bundled font (one static instance)
src/app/JetBrainsMono-Regular.ttf   ← bundled font (one static instance)
```

**Files to modify:**

```
src/app/page.tsx                    ← remove openGraph.images and twitter.images arrays
                                       (Next now auto-wires both via the file convention)
```

**Font loading pattern:**

```ts
const fraunces = await fetch(
  new URL('./Fraunces-Italic.ttf', import.meta.url)
).then((res) => res.arrayBuffer())
```

This pattern works in both Edge and Node runtimes. The TTF files are bundled into the build output by Next's bundler.

**Font source:** Download static-instance TTFs from Google Fonts:

- Fraunces Italic 400 — from the [Fraunces family page](https://fonts.google.com/specimen/Fraunces) "Get font" → extract `static/Fraunces-Italic.ttf`
- JetBrains Mono Regular 500 — from the [JetBrains Mono family page](https://fonts.google.com/specimen/JetBrains+Mono) → extract `static/JetBrainsMono-Medium.ttf` (Google's "Medium" maps to weight 500)

Drop both into `src/app/` alongside `opengraph-image.tsx`. Rename to match the import paths above if the downloaded filenames differ.

**Renderer:** `ImageResponse` from `next/og`, which uses Satori internally. Satori supports a CSS subset — flexbox, absolute positioning, basic typography. It does **not** support `font-variation-settings`, container queries, or Tailwind. Layout uses fixed pixel sizes.

## Constraints & Trade-offs

- **Static font instances, not variable Fraunces.** Satori's variable-font support is incomplete. At this size (~92px) the visual difference is invisible.
- **Single light variant.** Social platforms cache the OG image; it can't adapt to viewer theme. Light was chosen for editorial/approachable feel; tradeoff is less feed-stopping power vs. dark on white feeds.
- **Hook copy is verbatim from the hero.** Keeps the OG card and the homepage's first impression in lockstep — if the hero copy changes, both should change together.

## Out of Scope

- **Per-talk OG cards** (`app/talks/[slug]/opengraph-image.tsx`) — flagged earlier when adding the Share-on-X feature, deferred to a separate spec
- **Variable-font axes** (opsz, SOFT) in the rendered image — not supported by Satori, not worth working around
- **Dark variant** — single fixed asset, light was chosen
- **Removing `/public/images/AirplaneMaker.jpg`** — leave on disk; user may use it elsewhere
- **Automated visual-regression tests** — UI is static, hand-verification is sufficient

## Verification

1. **Local PNG render:** `pnpm dev`, visit `http://localhost:3000/opengraph-image` → renders the PNG directly
2. **Meta-tag wiring:** view-source on `/` → confirm `<meta property="og:image" content="...">` points at the auto-generated path (not at AirplaneMaker.jpg)
3. **Social preview:** after deploy, paste `https://me.kochie.io/` into:
   - X compose box → expect card to show the hook quote
   - [opengraph.xyz](https://www.opengraph.xyz/) → expect rendered preview matches mockup
   - iMessage / Slack / LinkedIn → spot-check rendering across surfaces

## Error Handling

Pure rendering route, no runtime data dependencies. The only failure mode is font fetch failing at build/first-request — in that case Next surfaces the error and the build fails loudly. No silent fallbacks; a broken card is worse than a failed build.
