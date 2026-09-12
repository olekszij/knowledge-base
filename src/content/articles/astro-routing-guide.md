---
title: Understanding File-Based Routing in Astro
description: A comprehensive guide to how routing works in Astro and how to structure your project.
date: 2026-09-13
category: Guides
tags:
  - Astro
  - Routing
  - Frontend
draft: false
---

# Understanding File-Based Routing in Astro

Astro uses a **file-based routing** approach. Every `.astro`, `.md`, or `.mdx` file located inside the `src/pages/` directory automatically becomes a page on your website.

## Static Routes

The simplest form of routing is static routing. The directory structure directly maps to the URL structure of your site.

```text
src/pages/
├── index.astro        -> mysite.com/
├── about.astro        -> mysite.com/about
├── about/
│   └── index.astro    -> mysite.com/about
└── blog/
    ├── index.astro    -> mysite.com/blog
    └── post-1.md      -> mysite.com/blog/post-1
```

> [!TIP]
> Both `about.astro` and `about/index.astro` result in the exact same URL `/about`. It's a matter of preference which one you use!

## Dynamic Routes

When you don't know the exact names of your pages ahead of time (like blog posts or product pages), you can use **dynamic routes**. A dynamic route is created by adding brackets `[]` to a file name.

For example, `src/pages/authors/[author].astro` generates routes for any author name.

### `getStaticPaths()`

Because Astro is a static site generator by default, any dynamic route requires an exported `getStaticPaths()` function. This function tells Astro exactly which pages to build at build time.

```astro
---
// src/pages/authors/[author].astro
export function getStaticPaths() {
  return [
    { params: { author: 'john-doe' } },
    { params: { author: 'jane-smith' } },
    { params: { author: 'alice-jones' } },
  ];
}

const { author } = Astro.params;
---

<h1>Articles by {author}</h1>
```

## Rest Parameters (Catch-all Routes)

If you need a single file to handle routes with multiple dynamic path segments (like a nested folder structure), you can use a rest parameter `[...slug]`.

```astro
---
// src/pages/docs/[...slug].astro
export function getStaticPaths() {
  return [
    { params: { slug: undefined } }, // Matches /docs
    { params: { slug: 'getting-started' } }, // Matches /docs/getting-started
    { params: { slug: 'api/v1/auth' } }, // Matches /docs/api/v1/auth
  ];
}

const { slug } = Astro.params;
---

<h1>Viewing docs for: {slug || 'Overview'}</h1>
```

## Conclusion

File-based routing makes visualizing your site's structure incredibly intuitive. By combining static files, bracket syntax for dynamic parameters, and the catch-all spread syntax, you can build any URL structure you need!
