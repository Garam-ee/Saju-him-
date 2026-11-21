# Saju-him-

Source for the English saju site **sajuhim.netlify.app** (`@saju_him`).

## Layout

- `/<slug>/index.html` — one self-contained article page per keyword. Inline CSS, no build step. The template is the live site's `.sub` page (dark `#08080A`, single column, 660px, hot-orange `#FF3B1F` accents): back link to `/`, lowercase H1, lede, one image from `/assets/`, uppercase H2 sections, CTA to the free calculator on `/`, fine print.
- `social/YYYY-MM-DD-threads-reels-copy.md` — the Threads / Reels copy that ships with each article.

## Already live on the site (not in this repo yet)

`/` · `/dictionary/` · `/what-element-am-i-missing/` · `/why-he-went-quiet/` · `/korean-saju-compatibility/` · `/gunghap-calculator/`

Those pages went up as a folder upload, so this repo does not hold them yet. Until they are imported (or Netlify is connected to this repo), a merged article still has to be uploaded by hand.

## Before a new article is live

1. Add `<url><loc>https://sajuhim.netlify.app/<slug>/</loc><priority>0.7</priority></url>` to `sitemap.xml`.
2. Add a card for it to the homepage article block.
3. Deploy (manual upload until this repo is connected to Netlify).
