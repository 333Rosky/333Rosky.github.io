# Romain Bastiani — Portfolio (Hugo + PaperMod)

This repository contains the source of my personal portfolio built with Hugo and the PaperMod theme.

Live site: `https://333rosky.github.io`

## Features
- Hugo Extended + PaperMod theme (as a git submodule)
- English (default) and French, with language subfolders (`/en`, `/fr`)
- Clean URLs and sitemap/feeds
- GitHub Actions workflow to deploy to GitHub Pages

## Requirements (for local development)
- Hugo Extended (latest)
- Optional: Node.js/npm if you want custom scripts (not required)

Verify your setup:
```
hugo version
```

## Getting started
Clone and initialize the theme submodule:
```
git clone https://github.com/333Rosky/333Rosky.github.io.git
cd 333Rosky.github.io
git submodule update --init --recursive
```

Start a local dev server:
```
hugo server -D
# open http://localhost:1313
```

Build the site:
```
hugo --gc --minify
# Output goes to docs/ (see publishDir in config.yaml)
```

## Deployment (GitHub Pages via Actions)
This repo uses GitHub Actions to build and publish the site to GitHub Pages on every push to `main` (and `hugo-rebuild`).

- Workflow: `.github/workflows/deploy.yml`
- Pages setting: Repository → Settings → Pages → Build and deployment → GitHub Actions

To trigger a deployment:
```
git add -A && git commit -m "content: update" && git push
```
Then wait for the “Deploy Hugo to GitHub Pages” job to finish and open `https://333rosky.github.io`.

## Internationalization (i18n)
- Default language: English
- `defaultContentLanguageInSubdir: true` → English lives under `/en`, French under `/fr`.
- Menus and profile buttons are defined per language in `config.yaml` under `languages.en` and `languages.fr`.

Content structure:
- English: `content/en/...`
- French: `content/fr/...`

## Customize
Edit `config.yaml`:
- `baseURL`: `https://333rosky.github.io/`
- `title`, `params.profileMode` (title, subtitle, buttons)
- Menu entries per language under `languages.*.menu.main`

Static assets:
- Put images and documents (e.g., `cv.pdf`) in `static/` → available at `/cv.pdf`, `/Linkedin PP.jpg`, etc.

## Theme (PaperMod)
The theme is tracked as a submodule in `themes/PaperMod`.
If you ever re-clone the repository or switch machines, run:
```
git submodule update --init --recursive
```

## Project layout
- `config.yaml` — Hugo configuration (including i18n, menus, publishDir)
- `content/` — pages and sections (`en/`, `fr/`)
- `static/` — static files copied as-is (images, PDFs)
- `themes/` — PaperMod (git submodule)
- `docs/` — build output used by GitHub Pages

## License
Content © Romain Bastiani. The code and configuration in this repository are provided as-is for personal site usage.
