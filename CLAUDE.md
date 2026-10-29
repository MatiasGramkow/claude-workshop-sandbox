# Claude workshop sandbox

Costume Lab: a Halloween costume builder. Astro 6 static site, deployed to GitHub Pages
under the base path `/claude-workshop-sandbox`. Every green PR is merged automatically, so
`npm run check` and `npm run build` must pass before you push.

## Commands

- `npm run dev` — local server at http://localhost:4321/claude-workshop-sandbox/
- `npm run check` — `astro check` (types + content schema)
- `npm run build` — static build into `dist/`

## House rules (reviews check these)

- **Costume pieces are content, not code.** One Markdown file per piece in
  `src/content/pieces/<piece-name>.md`; the schema in `src/content.config.ts` is the
  contract. Do not edit someone else's piece.
- **Pieces draw on the mannequin's grid.** Every `svg` uses the 240 x 360 coordinate system
  of `src/components/Mannequin.astro` (head centre 120,68 r 34; hands at 58,228 and 182,228;
  feet at y 340). Only drawing elements - the schema rejects script, style, links, images and
  event handlers, because PRs merge themselves. Slots and layer order live in `src/lib/slots.ts`.
- **Links and assets use the base path.** Build URLs from `import.meta.env.BASE_URL`;
  a hard-coded `/foo` breaks on GitHub Pages.
- **Page colours come from the tokens** in `src/layouts/Base.astro` (`--bg`, `--surface`,
  `--text`, `--muted`, `--border`, `--accent`, `--glow` …). No new hex values in page CSS;
  SVG drawings (pieces, mannequin) choose their own colours.
- **Scoped styles.** Use the component's `<style>` block; `is:global` only in the layout.
- **No new dependencies** without a reason in the PR description.
- **The site works without JavaScript.** Enhance with a small `<script>`; never make the
  builder depend on it (picking pieces is pure CSS: `:has()` + `:checked`).
- Code, comments and commit messages in English.

## Do not touch

`.github/` — PRs that change it are not auto-merged.
