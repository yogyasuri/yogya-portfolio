# Yogya Suri · Portfolio

Personal site for Yogya Suri, MBA candidate at IIM Jammu (2025–27): **Business meets AI. Product meets Strategy.**

React 19 · Vite · Lenis · CSS 3D (no animation library) · Outfit + Inter. Black-and-gold editorial design system in `src/styles/tokens.css`.

```bash
npm install
npm run dev      # http://localhost:5173 (shows gold "✎ To add" notes for missing facts)
npm run build    # outputs dist/ (notes are stripped)
```

## Editing content

All facts live in `src/content/`. Layout code never needs touching to update them.

| File | What's in it |
|---|---|
| `profile.js` | Name, education, links, résumé, portrait, proof points, About copy, contact copy |
| `experience.js` | Cars24 experience (page at `#/experience/cars24`) |
| `projects.js` | Case studies (`#/work/<slug>`), filters, Maruti MARS framework and financials |
| `record.js` | Competitions, journey, toolbox, certifications, writing, Beyond Work |
| `media.js` | **Every image**: path, alt text, ratio, caption, credit, gallery order |

## Adding images

Save a file at the path listed in `src/content/media.js` (inside `public/images/…`) and it appears automatically. Until then each slot shows a designed placeholder saying what belongs there; in `npm run dev` it also shows the exact file path. See `public/images/README.md`.

An empty string `''` means "not confirmed yet": it's hidden on the live site and flagged in dev mode.
Never add invented numbers. Label projected figures as projected.

## Routes

`#/` home · `#about` (and other sections) · `#/about` · `#/work/<slug>` · `#/experience/<slug>` · `#/writing/<slug>`

Hash routing works on any static host (Vercel, Netlify, GitHub Pages) with no server config.
