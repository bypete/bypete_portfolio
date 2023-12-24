import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import { remarkReadingTime } from './remark-reading-time.mjs';
import preact from '@astrojs/preact';
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
        mdx({
            rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
        }),
        alpinejs(),
        icon({
            include: {
                mdi: ['*'], // (Default) Loads entire Material Design Icon set
                lucide: ['*'],
            },
        }),
    ],
    markdown: {
        rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
        remarkPlugins: [remarkReadingTime],
    },
});
