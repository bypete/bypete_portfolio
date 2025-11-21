import {
  defineConfig
} from 'astro/config';
import mdx from '@astrojs/mdx';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import icon from 'astro-icon';
import {
  remarkReadingTime
} from './src/js/remark-reading-time.mjs';
import {
  remarkExtractHeadings
} from './src/js/remark-extract-headings.mjs';
import preact from '@astrojs/preact';
import svgr from "vite-plugin-svgr";
import rehypeAttrs from 'rehype-attr';
import rehypeExternalLinks from 'rehype-external-links';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';
import alpine from '@astrojs/alpinejs';

let svgoPrefixIdsCount = 0;

const SVGOConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          inlineStyles: { onlyMatchedOnce: false },
          cleanupIds: { minify: true },
          removeDoctype: false,
          removeViewBox: false,
        },
      },
    },
    {
      name: 'prefixIds',
      params: {
        delim: '',
        prefixIds: true,
        prefix: () => `_${svgoPrefixIdsCount++}`,
      },
    },
    {
      name: 'removeUnknownsAndDefaults',
      params: {
        defaultAttrs: false,
      },
    },

  ],
};


const rehypeExternalLinksConfig = [
  rehypeExternalLinks,
  {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
      // content: {
      //     type: 'text',
      //     value: '🔗',
      // },
      properties: {
          className: ['external']
      }
  },
];

// https://astro.build/config
export default defineConfig({
  site: 'https://bypete.uk',
  trailingSlash: 'always',
  compressHTML: true,
   experimental: {
   svg: true,
 },
  // redirects: {
  //     '/bio/': '/about',
  // },
  // build: {
  //     format: 'file',
  // },

  integrations: [
      preact({
          compat: true
      }),
      mdx({
          remarkPlugins: [remarkReadingTime, remarkExtractHeadings],
          rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig],
      }),
      icon({
          include: {
              mdi: ['*'],
              lucide: ['*'],
              "fa6-brands": ['*'],
          },
          svgoOptions: SVGOConfig,
      }),
      partytown({
          config: {
              forward: ['dataLayer.push', 'gtag'],
          },
      }),
      sitemap(),
      alpine({
          entrypoint: '/src/entrypoint'
      })
  ],

  markdown: {
      rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig, rehypeHeadingIds],
      remarkPlugins: [remarkReadingTime, remarkExtractHeadings],
  },

  vite: {
      plugins: [
          svgr({
            svgrOptions: {
              plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
              titleProp: true,
              svgoConfig: SVGOConfig
            },
          }),
          tailwindcss(),
      ],
      resolve: {
          alias: {
              'react': 'preact/compat',
              'react-dom': 'preact/compat',
              'react/jsx-runtime': 'preact/jsx-runtime'
          }
      }
  },
});