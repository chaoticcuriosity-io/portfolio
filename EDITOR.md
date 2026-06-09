# Visual Editor

A Wix/Squarespace-style inline editor for this site. It runs **only on localhost** (in `next dev`)
and is completely stripped from the production build — the live site at donbalanzat.com never
ships or exposes any of it.

## Start it

```bash
npm run dev
```

Open http://localhost:3000. A small toolbar sits at the bottom of the screen. Click **Edit site**
to turn on edit mode (the dot turns amber). Click it again to go back to preview.

## What you can change

**Text** — click almost any text (hero headline, taglines, section headers, bullets, the studio
blurb, contact copy, the whole About page, domain intros) and just type. Press **Enter** or click
away to finish. In headings/intros, select text and press **Ctrl/Cmd+B** (bold) or **Ctrl/Cmd+I**
(italic).

**Images & videos** — hover any image or video and click **⟳ Replace**. The media library opens:
- click any existing file to use it, or
- choose an **Upload to** folder and **Choose file** (or drag a file straight onto the grid) to add
  a new image/video. New uploads land in `public/media/<folder>/` with a tidy filename.

**Rearranging (drag & drop)**
- **Cards, gallery tiles, domain cards, bullets, mission lines** — hover and drag the **⠿** handle to
  reorder.
- **Whole sections** (Hero, Mission, Wins, Domains, Studio, Contact) — use the **↑ ↓** buttons in the
  section's corner bar to move them, or **Hide** to drop a section from the page (it stays available
  to **Show** again while editing).
- **Add / remove** — use **+ Add card / point / statement / media** to add items, and the **×** on an
  item to remove it.

**Accent colors** — each domain page (e.g. /ai) has an accent color swatch while editing.

## Save vs Publish

- **Save** — writes your changes to `app/_data/content.json` on disk and updates the local preview.
  Nothing goes live yet. Refresh-safe.
- **Publish** — saves, then `git commit` + `git push` (only `content.json` and `public/media`, never
  code). If the current branch is connected to Vercel, the live site redeploys in about a minute.

**Undo / Redo** (also Ctrl/Cmd+Z and Ctrl/Cmd+Shift+Z) and **Discard** (revert to the last save) are
in the toolbar.

## Going live for the first time

The editor currently lives on the `feature/visual-editor` branch. To use **Publish** to update the
real site, this branch needs to be merged into the branch Vercel deploys (`main`). Once it's on
`main`, run `npm run dev` from `main`, edit, and **Publish** pushes your content changes to `main` →
Vercel redeploys. (The editor code is dev-only, so shipping it to `main` does not change the live
site.)

## How it works (for future-you)

- All editable content lives in `app/_data/content.json`. `app/_data/site.js` re-exports it in the
  shapes the pages consume.
- Pages render through shared View components (`app/_views/*`) using editable primitives
  (`app/_components/editable/*`). In production (and preview mode) those primitives render the exact
  original markup — the site is byte-for-byte what it was before the editor existed.
- The editor store, toolbar, drag-and-drop (dnd-kit), and the `/api/dev/*` routes are all gated to
  `NODE_ENV !== "production"`, so none of them are bundled or reachable on the deployed site.
