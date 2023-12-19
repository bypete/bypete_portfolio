import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './remark-reading-time.mjs';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import rehypeAttrs from 'rehype-attr';
import rehypeExternalLinks from 'rehype-external-links';
import alpinejs from '@astrojs/alpinejs';

const rehypeExternalLinksConfig = [
    rehypeExternalLinks,
    {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
        content: { type: 'text', value: '🔗' },
    },
];

// https://astro.build/config
export default defineConfig({
    site: 'https://bypete.uk',

    integrations: [
        preact(),
        tailwind(),
        mdx({
            rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
        }),
        alpinejs(),
    ],
    markdown: {
        rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
        remarkPlugins: [remarkReadingTime],
    },
});
