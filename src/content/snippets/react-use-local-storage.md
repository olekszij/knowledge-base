---
title: React useLocalStorage Hook
description: A custom React hook for seamlessly syncing state with localStorage.
date: 2026-09-13
category: Code Snippets
language: TypeScript
tags:
  - React
  - Hooks
  - TypeScript
  - LocalStorage
draft: false
---

# React useLocalStorage Hook

A robust and type-safe React hook for managing state synced with `localStorage`. It handles JSON parsing, SSR (Server-Side Rendering) safety, and state persistence.

## The Hook

Create a file named `useLocalStorage.ts` and add the following code:

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## Usage Example

Here's how to use the hook in a component:

```tsx
import React from 'react';
import { useLocalStorage } from './useLocalStorage';

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('app-theme', 'light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h2>Current Theme: {theme}</h2>
      <button 
        onClick={toggleTheme}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
}
```

### Why this is useful:
1. **Type Safety:** The generic `<T>` ensures that the state type matches the `initialValue` or explicitly passed type.
2. **SSR Safe:** The `typeof window === "undefined"` check prevents errors when rendering on the server (like in Next.js or Astro).
3. **Lazy Initialization:** The parsing logic is inside the `useState` initializer function, so it only runs on the first render, improving performance.
