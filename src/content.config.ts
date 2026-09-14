import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  order: z.number().optional(),

  tags: z.array(z.string()).default([]),
  coverImage: z.object({
    src: z.string().optional(),
    alt: z.string().optional(),
  }).optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  hasVideo: z.boolean().default(false),
  videoUrl: z.string().optional(),
  category: z.string().optional(),
});

const snippetSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),

  tags: z.array(z.string()).default([]),
  language: z.string().default('javascript'),
  draft: z.boolean().default(false),
});

const articles_en = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/articles/en" }),
  schema: articleSchema,
});

const articles_ru = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/articles/ru" }),
  schema: articleSchema,
});

const snippets_en = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/snippets/en" }),
  schema: snippetSchema,
});

const snippets_ru = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/snippets/ru" }),
  schema: snippetSchema,
});

export const collections = { articles_en, articles_ru, snippets_en, snippets_ru };