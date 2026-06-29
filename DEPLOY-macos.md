# Two experiences, one deploy

`main` now serves **both** the classic scroll site and the macOS desktop from a
single build/deploy:

| Route | Experience |
|-------|-----------|
| `/` | Classic scroll site (landing page, SEO + mobile friendly) |
| `/os` | macOS desktop experience |

Both are prerendered (`nuxt.config.ts` → `nitro.prerender.routes: ['/', '/os']`)
and ship from `.output/public`, so the existing GitHub Pages workflow deploys them
together — no second repo or subdomain needed.

## Cross-links (already wired)
- **Classic → macOS:** "Try the macOS version" button in the hero (`/os`).
- **macOS → Classic:** Apple menu → "Switch to Classic Site" and the desktop
  right-click menu both link to `/` (`CLASSIC_URL` in `components/MacMenuBar.vue`,
  and the `classic` handler in `components/MacDesktop.vue`).

## SEO
- Each route sets its own canonical + `og:url` (`/` → `https://haroonsohail.me`,
  `/os` → `https://haroonsohail.me/os`) so they don't collide.
- Both share the same favicon, OG image, and structured data.

## Deep links / debugging
- `/os?login` jumps straight to the lock screen; `/os?nologin` skips the intro to
  the desktop. The boot/login intro otherwise plays once per browser session
  (`sessionStorage`).

## Alternatives (not active)
- **Subdomain split:** host `/os` separately at `os.haroonsohail.me` via a second
  repo or Netlify/Cloudflare Pages, pointing a `CNAME` (`os` → `h4roons.github.io.`).
  Switch the cross-links back to absolute URLs if you do this.
- **Flip the primary:** make the macOS desktop the root (`pages/index.vue`) and move
  the classic site to `/classic`.
