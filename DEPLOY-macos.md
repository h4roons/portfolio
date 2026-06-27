# Deploying the macOS-style portfolio

This branch (`macos-theme`) is a self-contained alternate experience. `main` holds
the classic scroll site. They build identically (`npm run generate` → `.output/public`)
and can be deployed independently.

## Recommended: subdomain split

Keep both live, each on its own URL:

| Site | Branch | URL |
|------|--------|-----|
| Classic scroll site | `main` | `https://haroonsohail.me` |
| macOS desktop | `macos-theme` | `https://os.haroonsohail.me` |

Cross-links are already wired:
- The macOS **Apple menu → "Switch to Classic Site"** and the desktop right-click
  menu link to `https://haroonsohail.me` (edit `CLASSIC_URL` in
  `components/MacMenuBar.vue` and the handler in `components/MacDesktop.vue` if the
  classic URL changes).

### How to publish the subdomain (GitHub Pages)
GitHub Pages serves **one site per repo**, so use a second repo for the OS build:

1. Create a new public repo, e.g. `portfolio-os`.
2. Push this branch's contents to it (`git push os-remote macos-theme:main`), or
   copy the files in.
3. In that repo: **Settings → Pages → Source → GitHub Actions** (the existing
   `.github/workflows/deploy.yml` works as-is).
4. **Settings → Pages → Custom domain** → `os.haroonsohail.me`.
5. Namecheap **Advanced DNS** → add a **CNAME**: Host `os` → value `h4roons.github.io.`

(Alternatively host the OS build on Netlify/Cloudflare Pages from this branch and
point `os.haroonsohail.me` there — no second repo needed.)

## Alternative A: make the OS the main experience
Merge `macos-theme` → `main` and deploy at the apex. Then host the classic site at
`classic.haroonsohail.me` and flip the cross-link URLs.

## Alternative B: single deploy, two routes
Move the macOS page to `pages/os.vue` (it already uses `definePageMeta({ layout: false })`)
so the classic site stays at `/` and the desktop lives at `/os`. Then the cross-links
become `/` and `/os` instead of full URLs. Simplest to run, but both ship in one bundle.

## Notes
- The OS build sets the same SEO/OG tags as the classic site — if you deploy both,
  give the OS build its own `og:url`/canonical so previews don't collide.
- The intro boot/login only plays once per browser session (`sessionStorage`).
