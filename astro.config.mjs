import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import { remarkReadingTime } from './src/js/remark-reading-time.mjs';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import rehypeAttrs from 'rehype-attr';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';
import alpine from '@astrojs/alpinejs'
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
    // redirects: {
    //     '/bio/': '/about',
    // },
    compressHTML: true,
    // build: {
    //     format: 'file',
    // },
    integrations: [
      alpine({ entrypoint: '/src/entrypoint' }),
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
                            // removeUnknownsAndDefaults: {
                            //   defaultAttrs: false,  // Prevents removing common attributes like `preserveAspectRatio`
                            //   keepDataAttrs: true,  // Keep any `data-*` attributes
                            // },
                            removeDoctype: false,   // Keep DOCTYPE if present
                            cleanupIds: {
                                minify: true,  // Minify IDs but don't remove them
                            },
                            removeViewBox: false,   // Ensure the viewBox attribute is not removed
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
                {
                          name: 'removeUnknownsAndDefaults',
                          params: {
                              defaultAttrs: false, // Ensures `enable-background`, `preserveAspectRatio`, etc. are preserved
                            },
                },
            ],
        },
      }),
      sitemap(),
      partytown({
          config: {
            forward: ['dataLayer.push', 'gtag'],
          },
      }),
    ],
    markdown: {
        rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
        remarkPlugins: [remarkReadingTime],
    },
});
