# Portfolio Hugo + PaperMod

Ce dépôt contient la nouvelle version du portfolio, généré avec Hugo et le thème PaperMod.

## Prérequis
- Hugo Extended (recommandé)
- (Optionnel) Node.js + npm pour scripts de confort

## Utilisation
- Dev: `hugo server -D` puis ouvrir http://localhost:1313
- Build: `hugo --gc --minify` (sortie dans `docs/`)
- Déploiement GitHub Pages: paramétrer Pages sur la branche `main`, dossier `/docs` ou utiliser `git subtree` vers `gh-pages`.

## Contenu
- Config: `config.yaml`
- Articles: `content/`
- Statique (images, CV): `static/`
