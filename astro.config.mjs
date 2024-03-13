import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import { remarkReadingTime } from './src/js/remark-reading-time.mjs';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import rehypeAttrs from 'rehype-attr';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';
import alpine from '@astrojs/alpinejs';
import partytown from '@astrojs/partytown';
const rehypeExternalLinksConfig = [
    rehypeExternalLinks,
    {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
        content: {
            type: 'text',
            value: '🔗',
        },
    },
];
let svgoPrefixIdsCount = 0;

// https://astro.build/config
export default defineConfig({
    site: 'https://bypete.uk',
    trailingSlash: 'always',
    redirects: {
        '/bio/': '/about',
    },
    // build: {
    //     format: 'file',
    // },
    integrations: [
        preact(),
        mdx({
            rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
        }),
        icon({
            include: {
                mdi: ['*'],
                lucide: ['*'],
            },
            svgoOptions: {
                multipass: true,
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                // customize default plugin options
                                inlineStyles: {
                                    onlyMatchedOnce: false,
                                },
                                cleanupIds: {
                                    minify: true,
                                },

                                // or disable plugins
                                removeDoctype: false,
                            },
                        },
                    },
                    {
                        name: 'prefixIds',
                        params: {
                            delim: '',
                            prefix: () => `bp__${svgoPrefixIdsCount++}`,
                        },
                    },
                ],
            },
        }),
        sitemap(),
        alpine({
            entrypoint: '/src/entrypoint',
        }),
        partytown({
            config: {
                forward: ['dataLayer.push'],
            },
        }),
    ],
    markdown: {
        rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
        remarkPlugins: [remarkReadingTime],
    },
});
