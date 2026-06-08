# Don Balanzat — Portfolio

A fast, single-page portfolio (Next.js App Router, no external UI deps) positioning Don as an
**AI Enablement Leader & Builder**. Built as both a personal site and a work sample.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Edit content

- **Copy & sections:** `app/page.jsx` (hero, stats, pillars, AI-enablement feature, work grid, about, contact).
- **Selected work cards:** the `WORK` array at the top of `app/page.jsx` (title, description, tags, media).
  Media ending in `.mp4` auto-renders as a looping muted video; otherwise it's an image.
- **Styling / theme:** `app/globals.css` (CSS variables at the top control colors, radius, max width).
- **Images / video:** `public/images/`. Résumé PDF: `public/resume/don-balanzat-resume.pdf`.

## Deploy to Vercel

**Option A — Git + Vercel dashboard (recommended)**
1. Push this folder to a new GitHub repo.
2. vercel.com → New Project → import the repo → framework auto-detects **Next.js** → Deploy.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

## Connect your domain (keep it registered at Wix, just point DNS)

1. Vercel → Project → **Settings → Domains** → add your domain.
2. Vercel shows records — typically an **A record** `76.76.21.21` for the apex and a **CNAME**
   `cname.vercel-dns.com` for `www`.
3. In **Wix → Domains → DNS records**, add those records. Propagation is usually under an hour.

## Credits

Imagery sourced from the private `chaoticcuriosity-io/dons-pres` project.
