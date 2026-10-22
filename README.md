# Sthir Pokhrel — Portfolio

**The Visual Playground — A Designer's Mind in Motion.**
A React + Vite portfolio for Sthir Pokhrel, Graphic Designer & UI/UX Designer, Kathmandu, Nepal.

## Stack

| Concern         | Choice                                        |
| --------------- | --------------------------------------------- |
| Framework       | React 19 + Vite                               |
| Routing         | react-router-dom (clean `/work/:slug` URLs)   |
| Motion          | Motion for React (`motion/react`)             |
| Scroll          | GSAP ScrollTrigger (pinned gallery) + Lenis   |
| Icons           | lucide-react                                  |
| Styles          | Global CSS architecture, one file per section |
| Fonts           | Space Grotesk, Instrument Serif, Inter, JetBrains Mono (Google Fonts) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

Node 18+ is required.

## Project structure

```
src/
  components/      Navbar, Preloader, CustomCursor, Hero, SelectedWork, ProjectItem,
                   CaseStudy, About, ExperienceTimeline, Skills, DesignProcess,
                   TypePlay, Contact, Footer, Artwork, Media, Reveal, …
  data/
    siteConfig.js  Name, links, availability, experience, skills, process, copy
    projects.js    The five projects + their case-study content and media
  pages/           Home, ProjectPage, NotFound
  hooks/           useReducedMotion, useMediaQuery, useMagnetic
  lib/scroll.js    Lenis + GSAP wiring, scrollTo helper
  styles/          globals.css (tokens, reset, utilities), animations.css
public/
  images/          Portrait / general imagery (optional)
  projects/        Real project screenshots go here (see below)
  fonts/           Optional self-hosted font files
  og-image.png     Social preview placeholder (replace with real artwork)
  favicon.svg      Favicon
```

## Editing content

Everything personal lives in **`src/data/siteConfig.js`**:

- `availability` — the hero label (`status`, `label`, `note`). It is manual; nothing on the site detects availability.
- `links.linkedin` — set the real profile URL (or `null` to hide the link everywhere).
- `contact.formEndpoint` — see *Contact form* below.
- `portrait` — add `portrait: '/images/portrait.jpg'` to show a photo in the About section instead of the abstract composition.
- `experience`, `education`, `skillGroups`, `process`, hero and contact copy.

Projects live in **`src/data/projects.js`**. Each project drives both its gallery item and its case-study page.

## Replacing concept artwork with real work

All visuals are currently original CSS/SVG compositions rendered by `src/components/Artwork.jsx`. Every media object in `projects.js` looks like one of these:

```js
// Concept artwork (current)
{ kind: 'artwork', variant: 'phone', props: { screen: 'home', scheme: 'ivory' }, ratio: '4/5', caption: 'Home screen' }

// Real screenshot (drop the file in /public/projects/<slug>/)
{ kind: 'image', src: '/projects/ecommerce-app-experience/home.jpg', alt: 'Home screen of the app', ratio: '4/5', caption: 'Home screen' }
```

Swap `kind: 'artwork'` entries for `kind: 'image'` entries and nothing else needs to change. Keep `ratio` so layout never shifts while images load. Images below the fold are lazy-loaded automatically; `srcSet` is supported if you export multiple sizes.

When a project becomes real work, set `concept: false` and remove `conceptNote` — the "Concept" badges disappear.

Available artwork variants: `monogram`, `marks`, `palette`, `menu`, `social`, `phone`, `flow`, `wireframe`, `system`, `desktop`, `ia`, `poster`, `typegrid`, `shapes`, `responsive`. Schemes: `ivory`, `ink`, `cobalt`, `orange`.

## Contact form (honest by design)

- With `contact.formEndpoint = null` (default) the form validates input, then composes the email for the visitor with everything pre-filled. `contact.fallback` picks how: `'gmail'` (default) opens Gmail's compose screen in a new tab; `'mailto'` opens the default email app. If a popup blocker stops the Gmail tab, it falls back to `mailto:`. The UI says which happens.
- Set `contact.formEndpoint` to a Formspree / Basin / Getform endpoint (e.g. `https://formspree.io/f/xxxx`) and the form POSTs JSON `{ name, email, message }` and shows real success/error states.

## Fonts

Fonts load from Google Fonts in `index.html`. To self-host, put the files in `public/fonts/`, add `@font-face` rules at the top of `src/styles/globals.css`, and remove the Google Fonts `<link>`.

## Accessibility & motion

- Honors `prefers-reduced-motion`: the preloader, split-text, parallax, pinned horizontal gallery, cursor and magnetic effects all fall back to static or simple fades.
- Custom cursor and magnetic buttons only run on fine-pointer devices.
- Horizontal gallery only pins on desktop (≥1024px + mouse); tablets/phones get a vertical editorial list.
- Semantic landmarks, skip link, visible focus states, accessible tablist (skills), disclosure buttons (process), form errors wired with `aria-describedby`.

## SEO

Title, description, Open Graph and Twitter tags live in `index.html`. Replace `public/og-image.png` (1200×630) with real artwork and update the `canonical` / `og:url` to the final domain.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import it in Vercel — framework preset *Vite* is detected automatically.
3. Build command `npm run build`, output directory `dist`.
4. `vercel.json` already rewrites all routes to `index.html` so `/work/<slug>` links work on refresh.

Any static host works (Netlify, Cloudflare Pages, GitHub Pages) as long as it serves `index.html` for unknown routes.
