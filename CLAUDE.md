# Claude workshop sandbox

Astro 6 static site, deployed to GitHub Pages under the base path `/claude-workshop-sandbox`.
Every green PR is merged automatically, so `npm run check` and `npm run build` must pass
before you push.

## Commands

- `npm run dev` — local server at http://localhost:4321/claude-workshop-sandbox/
- `npm run check` — `astro check` (types + content schema)
- `npm run build` — static build into `dist/`

## House rules (reviews check these)

- **Attendees are content, not code.** One Markdown file per person in
  `src/content/attendees/<first-name>.md`; the schema in `src/content.config.ts` is the
  contract. Do not edit someone else's file.
- **Links and assets use the base path.** Build URLs from `import.meta.env.BASE_URL`;
  a hard-coded `/foo` breaks on GitHub Pages.
- **Colours come from the tokens** in `src/layouts/Base.astro` (`--bg`, `--surface`,
  `--text`, `--muted`, `--border`, `--accent`). No new hex values in components.
- **Scoped styles.** Use the component's `<style>` block; `is:global` only in the layout.
- **No new dependencies** without a reason in the PR description.
- **The site works without JavaScript.** Enhance with a small `<script>`; never make the
  wall depend on it.
- Code, comments and commit messages in English.

## Do not touch

`.github/` — PRs that change it are not auto-merged.
