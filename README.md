# Saju-him-

Source for the English saju site **sajuhim.netlify.app** (`@saju_him`).

## What is here

The whole site as it is live, imported on 2026-11-21 from the Netlify deploy
`deploy-6abf0833696d28ab6cde5b2d-b918211fd6cb4bfa9bd7a7f1a5c79bad` and
checked byte-for-byte against the live pages:

- `index.html` — the calculator, serving `/`.
- `ask/`, `dictionary/`, `gunghap-calculator/` — the other pages.
- `what-element-am-i-missing/`, `why-he-went-quiet/`,
  `korean-saju-compatibility/`, `korean-birth-chart-red-flags/` — the articles.
- `assets/` — `cities.json`, element art, photos.
- `netlify.toml` (`publish = "."`), `netlify/functions/submission-created.js`,
  `_headers`, `robots.txt`, `sitemap.xml`.

No build step: what is in the repo is what Netlify serves. A deploy ZIP also
carried `홈 - 바로 가기.lnk`, a Windows shortcut left over from the folder
upload; it is not site content and is not in the repo.

## Article layout

- `/<slug>/index.html` — one self-contained article page per keyword. Inline CSS, no build step. The template is the live site's `.sub` page (dark `#08080A`, single column, 660px, hot-orange `#FF3B1F` accents): back link to `/`, lowercase H1, lede, one image from `/assets/`, uppercase H2 sections, CTA to the free calculator on `/`, fine print.
- `social/YYYY-MM-DD-threads-reels-copy.md` — the Threads / Reels copy that ships with each article.

## Before a new article is live

1. Add `<url><loc>https://sajuhim.netlify.app/<slug>/</loc><priority>0.7</priority></url>` to `sitemap.xml`.
2. Add a card for it to the `.jumps` block in `index.html` — the four `<details class="jump">` cards that open under the result, two across.
3. Push to `main`. Once Netlify Continuous Deployment points at this repo, a push to `main` deploys; until then, upload the folder by hand.
