# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

This is an Astro blog site using the official blog starter template.

**Content System**:
- Blog posts are stored as Markdown/MDX files in `src/content/blog/`
- Content schema is defined in `src/content.config.ts` with Zod validation
- Required frontmatter: `title`, `description`, `pubDate`
- Optional frontmatter: `updatedDate`, `heroImage`

**Routing**:
- `src/pages/` uses file-based routing
- `src/pages/blog/[...slug].astro` generates dynamic routes from blog collection
- Static site generation via `getStaticPaths()`

**Integrations**: MDX (`@astrojs/mdx`), Sitemap (`@astrojs/sitemap`)

**Global Constants**: Site title and description are configured in `src/consts.ts`
