# mbcoalson.com

Source for [mbcoalson.com](https://mbcoalson.com): essays and small public tools about building energy, AI, and the practical question of how we keep useful systems answerable to people.

The site is intentionally small. It is a place for work that benefits from being public—not a content mill, a personal data archive, or a claim that every project is finished.

## What’s here

- **Writing** — essays on AI, technology, freedom, and the human side of technical systems
- **Citizen-scientist work** — documented explorations of building energy and AI-assisted technical practice
- **Tools and projects** — bounded public artifacts with their own stated methods and limitations
- **Water Rising** — a separate creative-fiction project

## Local development

Requires Node.js 22.12 or later.

```bash
npm ci
npm run dev
```

Open the local URL Astro prints (normally `http://localhost:4321`).

### Verification

```bash
npm run build
npx playwright test
```

The Playwright suite checks core pages, content metadata, canonical URLs, privacy boundaries, and discovery links. A passing build or test suite is evidence about the site build—not a guarantee that claims in an essay or tool are correct.

## Publishing

The production branch is `master`. Pushing to it triggers the existing Netlify deployment, so public changes should arrive through a reviewed pull request and be checked locally before merge. After deployment, verify the intended public URL rather than treating a successful push as publication proof.

## Scope and privacy

This repository contains public website source only. It should not receive private notes, client or employer material, family data, raw project files, credentials, or unpublished research evidence. Public tools and writing should state their limits rather than implying a broader authority.

## Contributing

This is primarily a personal site. Small corrections are welcome via an issue or pull request; please open an issue before proposing a substantial change.
