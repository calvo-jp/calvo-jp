import rehypeShiki from '@shikijs/rehype';
import path from 'node:path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import {defineCollection, defineConfig, s} from 'velite';

const projects = defineCollection({
  name: 'projects',
  pattern: 'projects/**/*.md',
  schema: s.object({
    slug: s.slug('title'),
    title: s.string(),
    description: s.string(),
    tags: s.array(s.string()),
    cover: s.string(),
    createdAt: s.date(),
    repository: s.string().url(),
  }),
});

export default defineConfig({
  root: path.resolve('src/content'),
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener', 'noreferrer'],
        },
      ],
      [
        rehypeShiki as never,
        {
          themes: {
            light: 'min-light',
            dark: 'github-dark',
          },
          defaultColor: false,
        },
      ],
    ],
  },
  collections: {
    projects,
  },
  output: {
    clean: true,
    assets: 'static',
    data: 'src/.velite',
  },
});
