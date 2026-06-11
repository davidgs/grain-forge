# Grain Forge Studio

Marketing site for Grain Forge Studio, built with React and Vite.

## Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Markdown Posts

The site now supports a combined stream of blog posts and work-in-progress updates authored in Markdown.

### Content location

Add posts in `src/content/posts/`.

Each post is a directory that contains:

- `index.md` with frontmatter and body content
- `images/` with images used by that post

Example:

```text
src/content/posts/build-log-first-pour/
	index.md
	images/
		test-pour.png
```

### Required frontmatter

```md
---
title: Example post title
slug: example-post-title
date: 2026-06-01
type: blog
summary: One short summary sentence for cards and previews.
draft: false
---
```

### Optional frontmatter

```md
updatedAt: 2026-06-02
coverImage: /portfolio/tara-console/Tara-0-3.png
tags:
	- process
	- epoxy
```

### Supported `type` values

- `blog`
- `wip`

### Draft behavior

- `draft: true` remains visible in local development.
- Drafts are excluded from production builds.

### Images

Use post-local image paths in markdown and frontmatter.

Example:

```md
coverImage: ./images/test-pour.png
![Console table detail](./images/test-pour.png)
```

The post loader rewrites these to bundled image URLs during build.

### Callouts

Use fenced container syntax for callouts:

```md
:::note Shop note
This is a note callout.
:::

:::tip Why this matters
This is a tip callout.
:::

:::warn Heads up
This is a warning callout.
:::
```

### Routes

- `#posts` shows the full posts stream.
- `#posts/<slug>` shows an individual entry.

### Example starter file

See the existing examples in `src/content/posts/` for the expected format.
