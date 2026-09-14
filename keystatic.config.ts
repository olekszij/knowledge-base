import { config, fields, collection } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

const mdxComponents = {
  Alert: wrapper({
    label: 'Alert',
    schema: {
      type: fields.select({
        label: 'Type',
        options: [
          { label: 'Info', value: 'info' },
          { label: 'Warning', value: 'warning' },
          { label: 'Error', value: 'error' },
          { label: 'Success', value: 'success' },
        ],
        defaultValue: 'info',
      }),
      title: fields.text({ label: 'Title (optional)' }),
    },
  }),
  YouTube: wrapper({
    label: 'YouTube Video',
    schema: {
      videoId: fields.text({ label: 'YouTube Video ID (e.g. dQw4w9WgXcQ)' }),
    },
  }),
};

function getArticleSchema(lang: 'en' | 'ru') {
  return {
    title: fields.slug({ name: { label: 'Title' } }),
    description: fields.text({ label: 'Description', multiline: true }),
    date: fields.date({ label: 'Date', validation: { isRequired: true } }),
    order: fields.integer({ label: 'Lesson Order', defaultValue: 1 }),
    
    category: fields.relationship({
      label: 'Category',
      collection: `categories_${lang}`,
    }),

    tags: fields.array(
      fields.text({ label: 'Tag' }),
      { label: 'Tags', itemLabel: props => props.value }
    ),
    coverImage: fields.object({
      src: fields.image({
        label: 'Cover Image',
        directory: 'public/images/articles',
        publicPath: '/images/articles/',
      }),
      alt: fields.text({ label: 'Alt text (for screen readers and SEO)' }),
    }),
    draft: fields.checkbox({ label: 'Draft' }),
    featured: fields.checkbox({ label: 'Featured' }),
    
    hasVideo: fields.checkbox({ label: 'This article has a main video?' }),
    videoUrl: fields.conditional(
      fields.checkbox({ label: 'Show video URL' }),
      {
        true: fields.text({ label: 'YouTube URL' }),
        false: fields.empty(),
      }
    ),

    content: fields.mdx({ 
      label: 'Content', 
      extension: 'mdx',
      components: mdxComponents
    }),
  };
}

const snippetSchema = {
  title: fields.slug({ name: { label: 'Title' } }),
  description: fields.text({ label: 'Description', multiline: true }),
  date: fields.date({ label: 'Date', validation: { isRequired: true } }),

  tags: fields.array(
    fields.text({ label: 'Tag' }),
    { label: 'Tags', itemLabel: props => props.value }
  ),
  language: fields.text({ label: 'Language', defaultValue: 'javascript' }),
  draft: fields.checkbox({ label: 'Draft' }),
  content: fields.mdx({ label: 'Content', extension: 'mdx' }),
};

const categorySchema = {
  name: fields.slug({ name: { label: 'Name' } }),
  description: fields.text({ label: 'Description', multiline: true }),
};

export default config({
  ui: {
    brand: { name: 'Astro Knowledge Base' },
    navigation: {
      'ru-content': ['articles_ru', 'snippets_ru', 'categories_ru'],
      'en-content': ['articles_en', 'snippets_en', 'categories_en'],
    },
  },
  storage: process.env.NODE_ENV === 'development' 
    ? { kind: 'local' } 
    : {
        kind: 'github',
        repo: 'olekszij/knowledge-base',
      },
  collections: {
    categories_en: collection({
      label: 'Categories (EN)',
      slugField: 'name',
      path: 'src/content/categories/en/*',
      schema: categorySchema,
    }),
    categories_ru: collection({
      label: 'Categories (RU)',
      slugField: 'name',
      path: 'src/content/categories/ru/*',
      schema: categorySchema,
    }),
    articles_en: collection({
      label: 'Articles (EN)',
      slugField: 'title',
      path: 'src/content/articles/en/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      previewUrl: '/en/articles/{slug}/',
      schema: getArticleSchema('en'),
    }),
    articles_ru: collection({
      label: 'Articles (RU)',
      slugField: 'title',
      path: 'src/content/articles/ru/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      previewUrl: '/ru/articles/{slug}/',
      schema: getArticleSchema('ru'),
    }),
    snippets_en: collection({
      label: 'Snippets (EN)',
      slugField: 'title',
      path: 'src/content/snippets/en/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      previewUrl: '/en/snippets/{slug}/',
      schema: snippetSchema,
    }),
    snippets_ru: collection({
      label: 'Snippets (RU)',
      slugField: 'title',
      path: 'src/content/snippets/ru/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      previewUrl: '/ru/snippets/{slug}/',
      schema: snippetSchema,
    })
  },
});
