# Ethan Sanders — Personal Website

A dark, modern React + Vite site inspired by skiper-ui.com. It showcases your GitHub projects, skills, and ways to contact you. Built with Tailwind CSS, Framer Motion, and Lucide icons.

## Tech

- React 18 + Vite 5 (TypeScript)
- Tailwind CSS 3 (dark mode, custom theme)
- Framer Motion (subtle animations)
- Lucide icons

## Local setup

```powershell
# Install deps
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production (output to ./dist)
npm run build

# Preview the built site locally
npm run preview
```plaintext

## Content

Your info and projects are pulled from:

- Hard-coded featured repos in `src/components/Projects.tsx`
- Live GitHub API results via `src/lib/github.ts` for `Ethanjoyce2010`

Update copy in these components:

- `src/components/Hero.tsx` — hero heading and intro
- `src/components/Skills.tsx` — skills, tools, interests
- `src/components/Header.tsx` and `src/components/Footer.tsx` — links

## Deploy to GitHub Pages

This repo includes an actions workflow at `.github/workflows/deploy.yml`.

Steps:

1. Push to `main`.
2. In GitHub → Settings → Pages, set Source to “GitHub Actions” (only once).
3. The workflow builds the site and publishes `dist` to Pages.

The site will be available at:

```plaintext

<https://ethanjoyce2010.github.io/Personal-Website/>

```

Notes:

- Vite is configured with `base: './'` so assets resolve correctly under the repo path.
- Open Graph, favicon, and dark theme defaults are configured in `index.html` and `public/`.

## Custom domain (optional)

If you have a custom domain, add a `CNAME` file in `public/` and update the Pages custom domain setting.

## License

MIT
