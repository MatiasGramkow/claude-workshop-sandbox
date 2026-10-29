# Claude workshop sandbox

**Costume Lab** - a Halloween costume builder in Astro, made to practise **goals, loops and
reviews** with Claude Code in VS Code. Pick a hat, a face, an outfit, something for your back,
a prop and a sidekick, and the mannequin dresses up. Every piece is one Markdown file with an
SVG drawing, and every one arrives as a pull request.

Every pull request with a green build is merged into `master` automatically and the site
redeploys to **https://matiasgramkow.github.io/claude-workshop-sandbox/** within a minute
or two.

Break things — that is what it is for.

## Get going (5 minutes)

You need Node 22.12 or newer (`node -v`) and git.

1. **Fork** this repo on GitHub (top right, *Fork*), then clone *your fork*:
   ```bash
   git clone https://github.com/<your-github-user>/claude-workshop-sandbox.git
   cd claude-workshop-sandbox
   npm install
   npm run dev        # http://localhost:4321/claude-workshop-sandbox/
   ```
2. Open the folder in VS Code and start Claude Code.
3. Make a branch, make your change, push to your fork and open a pull request against
   `MatiasGramkow/claude-workshop-sandbox` → `master`.
4. CI runs `astro check` and `astro build`. Green → the PR is squash-merged by itself.
   Red → read the log, fix, push again; the PR merges when it turns green.

## Exercise 1 — your first PR (warm-up)

Add a costume piece: one new file in `src/content/pieces/<piece-name>.md`. Copy an existing
piece from the same slot (`head`, `face`, `body`, `back`, `prop` or `sidekick`) to see where
things sit, set `author` to your name, and write a one-line "how to make it" tip as the body.
One file per piece means nobody gets a merge conflict.

Let Claude draw it - that is the point:

> Add a zombie hand as a new prop to the Costume Lab. Look at the other props for the
> coordinate system, make it read clearly at thumbnail size, author: <your name>.

Then run `npm run dev`, click your piece on, and check it lines up with the mannequin.

## Exercise 2 — goals

`/goal <condition>` keeps Claude working until the condition is true; a Stop hook blocks
it from finishing early. Write the condition so it can be *checked*, not just felt:

```text
/goal The Costume Lab has a "Copy link" button next to "Surprise me" that copies the current
outfit's URL and shows "Copied!" for two seconds. It still works without JavaScript (button
hidden). npm run check and npm run build both pass.
```

Things to notice: how Claude verifies the condition, what happens when the condition is
vague ("make the page nicer"), and when you would use `/goal clear`.

## Exercise 3 — loops

`/loop [interval] <prompt or slash command>` repeats a prompt; leave out the interval and
Claude paces itself.

```text
/loop 2m Check whether my open PR on MatiasGramkow/claude-workshop-sandbox has merged
(gh pr list --author @me). If CI failed, read the log, fix it and push. Stop when it is merged.
```

The EDC version of this is the **`edc-loop`** plugin from the EDC marketplace (Azure DevOps
board → build → review → PR). See the workshop notes for how to set it up on your own board.

## Exercise 4 — reviews

Before you push, let Claude review your own diff:

```text
/code-review          # bugs in the current diff
/simplify             # quality pass, applies its fixes
```

Then swap: review a neighbour's open PR with `/code-review <PR url>` and leave a comment.
`CLAUDE.md` holds the house rules a review should check against.

## Ideas for bigger changes

Pick one, set a `/goal`, and let a loop babysit the PR:

- a "Download PNG" button for your finished costume
- ready-made looks ("Classic witch", "Spooky duo") as their own content collection
- a filter that shows only pieces from one costume (Vampire, Ghost …)
- a `/gallery` page that shows every piece big, grouped by author
- a little animation: the sidekick bobs, the pumpkin glows
- a 404 page that is a ghost

## How the automation works

| Workflow | When | Does |
|---|---|---|
| `ci.yml` | every PR and push to `master` | `npm ci`, `astro check`, `astro build` |
| `auto-merge.yml` | after CI passes on a PR | squash-merges the PR (refuses PRs touching `.github/`), then starts the deploy |
| `deploy.yml` | push to `master` / manual | builds and publishes to GitHub Pages |

`auto-merge` runs in this repository, never checks out PR code, and only merges the exact
commit CI tested.
