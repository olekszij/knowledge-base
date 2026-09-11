---
title: "Fetch Data in Astro Components"
description: "Common pattern for fetching data in Astro components with proper error handling"
date: 2024-01-20
category: "Astro"
tags: ["fetch", "api", "data"]
language: "astro"
draft: false
---

# Fetch Data in Astro Components

Here's a reusable pattern for fetching data in Astro components with proper error handling and loading states.

## Basic Fetch Pattern

```astro
---
interface Props {
  apiUrl: string;
}

const { apiUrl } = Astro.props;

let data = null;
let error = null;
let loading = true;

try {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  data = await response.json();
} catch (err) {
  error = err instanceof Error ? err.message : 'Unknown error';
} finally {
  loading = false;
}
---

{loading && (
  <div class="loading">Loading...</div>
)}

{error && (
  <div class="error">Error: {error}</div>
)}

{data && (
  <div class="data">
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
)}
```

## With Caching

For better performance, add caching:

```astro
---
const CACHE_DURATION = 60 * 5; // 5 minutes

async function getCachedData(url: string) {
  const cacheKey = `cache_${url}`;
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION * 1000) {
      return data;
    }
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  localStorage.setItem(cacheKey, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
  
  return data;
}

const data = await getCachedData(apiUrl);
---
```

## Error Boundaries

For better error handling, create an error boundary component:

```astro
---
interface Props {
  children: any;
  fallback?: any;
}

const { children, fallback } = Astro.props;
---

<slot />
```

This pattern ensures your Astro components handle data fetching gracefully.