import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Astro', value: 'Astro' },
            { label: 'Keystatic', value: 'Keystatic' },
            { label: 'Jamstack', value: 'Jamstack' },
            { label: 'UI', value: 'UI' },
            { label: 'Guides', value: 'Guides' },
            { label: 'Code Snippets', value: 'Code Snippets' },
            { label: 'Other', value: 'Other' },
          ],
          defaultValue: 'Astro'
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
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    }),
    snippets: collection({
      label: 'Snippets',
      slugField: 'title',
      path: 'src/content/snippets/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Astro', value: 'Astro' },
            { label: 'Keystatic', value: 'Keystatic' },
            { label: 'Jamstack', value: 'Jamstack' },
            { label: 'UI', value: 'UI' },
            { label: 'Guides', value: 'Guides' },
            { label: 'Code Snippets', value: 'Code Snippets' },
            { label: 'Other', value: 'Other' },
          ],
          defaultValue: 'Astro'
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        language: fields.text({ label: 'Language', defaultValue: 'javascript' }),
        draft: fields.checkbox({ label: 'Draft' }),
        content: fields.markdoc({ label: 'Content', extension: 'md' }),
      },
    })
  },
});
