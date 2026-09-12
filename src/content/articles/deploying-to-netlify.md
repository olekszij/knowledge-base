---
title: "Quick Guide to Deploying on Netlify"
description: "Step-by-step instructions on deploying your modern Astro site to Netlify in under two minutes."
date: 2026-09-09
category: "Other"
tags: ["deployment", "hosting", "netlify"]
draft: false
featured: false
---

# Quick Guide to Deploying on Netlify

Netlify is one of the premier hosting platforms for Jamstack applications. Deploying your Astro project there is incredibly straightforward.

## Steps for Deployment

1. **Push your code to GitHub:** Make sure your Astro project is committed and pushed to a GitHub repository.
2. **Log into Netlify:** Go to [netlify.com](https://www.netlify.com/) and click "Add new site" -> "Import an existing project".
3. **Connect to GitHub:** Authorize Netlify to access your repositories and select your project.
4. **Configure Build Settings:** Netlify is smart enough to auto-detect Astro. The default settings should be:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Deploy:** Click the deploy button and wait a few seconds.

Your site is now live globally on Netlify's Edge network! If you added an SSR adapter (like `@astrojs/netlify`), your dynamic API routes will automatically be converted to Netlify Functions.
