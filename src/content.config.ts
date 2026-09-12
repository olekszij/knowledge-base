import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['Astro', 'Keystatic', 'Jamstack', 'UI', 'Guides', 'Code Snippets', 'Other']),
    tags: z.array(z.string()).default([]),
    coverImage: z.object({
      src: z.string().optional(),
      alt: z.string().optional(),
    }).optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const snippets = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/snippets" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['Astro', 'Keystatic', 'Jamstack', 'UI', 'Guides', 'Code Snippets', 'Other']),
    tags: z.array(z.string()).default([]),
    language: z.string().default('javascript'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, snippets };