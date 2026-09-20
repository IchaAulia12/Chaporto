# Portfolio template

A plain HTML/CSS/JS portfolio skeleton: no framework, no build step, no dependencies. Open `index.html` in a browser and it works. Every design decision is a CSS variable, so you can drop your own design in without touching the markup.

## Files

```
portfolio/
├── index.html          Homepage: hero, about, featured work, quote, contact
├── work.html           All projects
├── project.html        Case-study template — duplicate once per project
├── about.html          Long-form bio, experience timeline, skills
├── 404.html            Not-found page
├── css/
│   ├── tokens.css      ← YOUR DESIGN GOES HERE (colours, fonts, spacing)
│   └── styles.css      Structure & components, in 14 numbered sections
├── js/
│   └── main.js         Theme toggle, mobile menu, footer year, scroll reveal
├── assets/             Placeholder SVGs — replace with your own images
├── robots.txt
└── sitemap.xml
```

## Run it locally

Double-clicking `index.html` works, but a local server behaves more like the real thing:

```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## Putting your own design in

**Start in `css/tokens.css`.** Nothing else in the CSS hardcodes a colour or size — it all points back to a variable there. Change one value and it updates everywhere, consistently.

| Want to change | Edit |
| --- | --- |
| Brand / accent colour | `--brand-500`, `--brand-600` |
| Backgrounds and text | the `--color-*` block |
| Dark mode | the `--dark-*` block |
| Font | `--font-sans` |
| Text sizes | `--text-xs` … `--text-4xl` |
| Spacing rhythm | `--space-*`, `--section-gap` |
| Corner roundness | `--radius-*` (set to `0` for sharp corners) |
| Max content width | `--container-width` |

### Adding a custom font

1. Put the `.woff2` files in `assets/`, or grab a `<link>` from Google Fonts.
2. Add it to the `<head>` of each page, **before** the stylesheets:
   ```html
   <link rel="preload" href="assets/YourFont.woff2" as="font" type="font/woff2" crossorigin />
   ```
3. Put it first in `--font-sans` in `tokens.css`:
   ```css
   --font-sans: "YourFont", system-ui, sans-serif;
   ```

Keep the system fonts as fallbacks — text stays readable while the font loads. Two weights (regular + bold) is usually plenty; every extra file slows the page down.

### Going further

`styles.css` is split into numbered sections with a table of contents at the top. Rewrite any section freely — class names are plain (`.card`, `.hero`, `.button`), so the HTML keeps working. If you prefer starting over, delete `styles.css` and write your own against the same markup.

## Filling in your content

Search for these placeholders across all `.html` files and replace them:

| Placeholder | Meaning |
| --- | --- |
| `Your Name` | your name (also in `.brand`) |
| `hello@example.com` | your email |
| `yourhandle` | your GitHub / LinkedIn username |
| `https://ichaaulia12.github.io/Chaporto/` | already set — only change this if you move to a custom domain (it appears in `<link rel="canonical">`, `og:url`, `sitemap.xml`, `robots.txt`) |
| `Your City` | your location |

**Adding a project:** copy one `<article class="card">` block in `work.html`, then duplicate `project.html` as e.g. `project-acme.html` and point the card's link at it.

**Images:** replace the SVGs in `assets/`. Save screenshots at roughly 1600×1000, export as WebP if you can, and keep the `width`/`height` attributes on `<img>` — they stop the page jumping around while images load.

**The contact form** needs a backend to actually send mail. Free options that need no server code: [Formspree](https://formspree.io), [Netlify Forms](https://docs.netlify.com/manage/forms/setup/), or [Basin](https://usebasin.com). Set the form's `action` to the URL they give you. Until then the `mailto:` link works fine.

## Publishing it

This site is hosted with **GitHub Pages** at:

**https://ichaaulia12.github.io/Chaporto/**

Pages is set to deploy from the `main` branch, root folder. Every push to `main` republishes the site automatically, usually within a minute. There is no build step, so nothing can fail to compile.

To check on a deploy: the **Actions** tab shows a "pages build and deployment" run for each push.

The `.nojekyll` file in the root tells GitHub to publish the files exactly as they are, instead of running them through Jekyll first.

### If you ever want a custom domain

Buy a domain, then in Settings → Pages → Custom domain, enter it and follow the DNS instructions. Afterwards, update the canonical/`og:url` tags in the four HTML pages plus `sitemap.xml` and `robots.txt` to the new address.

### Other hosts

The same files work unchanged on **Netlify**, **Cloudflare Pages** (drag the folder onto their dashboard) or **Vercel** (`vercel deploy`). All of them pick up `404.html` automatically.

## Why it's fast

- No framework, no bundler, no runtime dependencies. The whole homepage — HTML, both stylesheets, the JS and the placeholder graphics — is about **14 KB gzipped** (52 KB raw), in 7 requests.
- System fonts by default, so there's no font download blocking the first paint.
- Images are lazy-loaded below the fold and have fixed dimensions (no layout shift).
- The theme is applied by a tiny inline script before first paint, so dark mode never flashes white.

## Accessibility notes

These are already wired up — worth keeping as you edit:

- One `<h1>` per page, headings in order, real landmarks (`header`/`main`/`footer`/`nav`).
- A "Skip to main content" link for keyboard users.
- Visible focus rings on everything interactive (`:focus-visible`).
- The mobile menu reports its state with `aria-expanded` and closes on <kbd>Esc</kbd>.
- Animations are disabled for anyone with "reduce motion" turned on in their OS.
- Every form input has a real `<label>`; hints are linked with `aria-describedby`.

When you change colours, check contrast — body text should hit at least 4.5:1 against its background. Free checker: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

## Things you might want to add later

- A blog or notes section (copy the `.prose` layout from `project.html`)
- Project filtering by tag on `work.html`
- An `og-image.png` (1200×630) in `assets/` for nicer social share previews
