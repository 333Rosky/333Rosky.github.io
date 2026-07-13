# Romain Bastiani — Portfolio

Minimal English-language portfolio for a quantitative researcher, built with Hugo and PaperMod.

Live site: [333rosky.github.io](https://333rosky.github.io)

## Local development

Requirements: Hugo Extended.

```powershell
hugo server -D
```

The local site is available at `http://localhost:1313`.

## Production build

```powershell
hugo --gc --minify
```

Hugo writes the production output to `docs/`, as configured in `config.yaml`.

## Structure

- `content/en/`: Experience, projects, and education content
- `layouts/`: Custom page and partial templates
- `assets/css/extended/research-site.css`: Portfolio styling
- `static/js/halvorsen-attractor.js`: Animated Halvorsen attractor
- `static/Romain Bastiani Resume.pdf`: Downloadable resume
- `cv/Romain_Bastiani_Resume.tex`: LaTeX resume source

Pushes to `main` deploy the site through GitHub Pages.
