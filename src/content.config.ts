import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['Astro', 'Decap', 'Jamstack', 'UI', 'Other']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const snippets = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['Astro', 'Decap', 'Jamstack', 'UI', 'Other']),
    tags: z.array(z.string()).default([]),
    language: z.string().default('javascript'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, snippets };