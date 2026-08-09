# Sai Praneeth Kamishetty — Portfolio

Live: [portfolio-henna-zeta-6a0662eupa.vercel.app](https://portfolio-henna-zeta-6a0662eupa.vercel.app)

Portfolio site for Sai Praneeth Kamishetty, Applied Generative AI Engineer: retrieval-augmented
generation, semantic search, AI agents, conversational AI, and Python/FastAPI backends.

## Stack

- Next.js 15 (App Router, static export)
- TypeScript
- Tailwind CSS 3
- Framer Motion (scroll reveals only)
- lucide-react

## Structure

```
src/app/          layout, metadata, page shell, favicon
src/components/   one component per section + shared Section/Reveal primitives
src/content/      all copy lives here, separate from presentation
src/lib/site.ts   canonical URL + basePath-aware asset() helper
public/resume/    resume PDF served by the nav and contact CTAs
```

Content edits happen in `src/content/` — no JSX changes required.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export to ./out
```

## Deploy

`.github/workflows/deploy-pages.yml` builds and publishes `./out` to GitHub Pages on every push to
`main`. When `GITHUB_ACTIONS=true`, `next.config.ts` applies the `/saipraneeth-portfolio` basePath
and exposes it as `NEXT_PUBLIC_BASE_PATH` so plain `<a href>` links to `public/` assets resolve.

If the canonical deployment moves, update `SITE_URL` in `src/lib/site.ts`.
