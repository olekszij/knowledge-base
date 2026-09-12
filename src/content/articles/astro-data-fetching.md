---
title: How to Fetch Data in Astro Components
description: Learn how to natively fetch data from APIs, CMSs, and databases directly in your Astro components.
date: 2026-09-13
category: Guides
tags:
  - Astro
  - Data Fetching
  - API
draft: false
---

# How to Fetch Data in Astro Components

Fetching data in Astro is incredibly straightforward because Astro components have access to top-level `await`. You don't need complex `useEffect` hooks or `getServerSideProps` functions; you can just write plain JavaScript/TypeScript right in the component script block.

## Top-level Await

In Astro, the code block at the top of your `.astro` file (delineated by `---`) runs on the server at build time (or at request time if using SSR). This means you can fetch data securely without exposing API keys to the client.

```astro
---
// src/components/UserList.astro

// This runs on the server!
const response = await fetch('https://jsonplaceholder.typicode.com/users');
const users = await response.json();
---

<ul>
  {users.map((user) => (
    <li>{user.name} - {user.email}</li>
  ))}
</ul>
```

## Fetching Data from a CMS (like Keystatic)

If you are using a local CMS or Content Collections, you don't even need `fetch`. You can use Astro's built-in `getCollection` API.

```astro
---
import { getCollection } from 'astro:content';

// Fetch all articles from the 'articles' collection
const allArticles = await getCollection('articles');

// Filter out drafts
const publishedArticles = allArticles.filter(article => !article.data.draft);
---

<div class="grid">
  {publishedArticles.map(article => (
    <a href={`/articles/${article.id}`}>
      <h2>{article.data.title}</h2>
    </a>
  ))}
</div>
```

## Environment Variables and Security

Because Astro component scripts run on the server, it is the perfect place to use private environment variables (like Database passwords or secret API tokens).

```astro
---
// This token is safe! It will NEVER be sent to the browser.
const API_TOKEN = import.meta.env.SECRET_API_TOKEN;

const response = await fetch('https://api.mysecuredata.com/v1/info', {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
});
const secureData = await response.json();
---

<div>{secureData.message}</div>
```

If you need an environment variable to be accessible on the client side (e.g., inside a React component tracking analytics), you must prefix it with `PUBLIC_`.

```text
// .env file
SECRET_PASSWORD=supersecret      # Only available in Astro frontmatter
PUBLIC_ANALYTICS_ID=UA-123456    # Available everywhere, including client JS
```

## Conclusion

Data fetching in Astro is as simple as writing standard asynchronous JavaScript. Thanks to top-level `await` and server-side rendering, your data fetches are fast, secure, and SEO-friendly out of the box!
