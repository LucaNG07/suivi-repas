# Fix: deploy to GitHub Pages

This PR does the following:

- Use React plugin in `vite.config.js` instead of Vue plugin
- Set `base: './'` to make assets work on GitHub Pages
- Fix CSS issues (remove accidental JS paste and consolidate styles)
- Add GitHub Actions workflow `.github/workflows/gh-pages.yml` to build and publish `dist/` to branch `gh-pages`

How to test:
1. Merge this PR into `main`.
2. Wait for the "Deploy to GitHub Pages" workflow to finish.
3. Check site at `https://<username>.github.io/<repo>/` (or pages configured URL).

Notes:
- If you use a custom repository name or pages config, adjust `base` accordingly.
- If `gh` is installed, the provided script will create the PR automatically.
