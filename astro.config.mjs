import alpine from '@astrojs/alpinejs';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import rehypeAttrs from 'rehype-attr';
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from 'rehype-external-links';
import arraybuffer from "vite-plugin-arraybuffer";
import svgr from "vite-plugin-svgr";
import {
  remarkExtractHeadings
} from './src/libs/remark-extract-headings.mjs';
import {
  remarkReadingTime
} from './src/libs/remark-reading-time.mjs';

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
          mergePaths: false,
        },
      },
    },
    { name: 'removeViewBox', active: false },
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
      properties: {
          className: ['external']
      }
  },
];

const rehypeAutolinkHeadingsConfig = [
  rehypeAutolinkHeadings,
  {
    content: {
      type: 'text',
      value: '🔗',
    },
    headingProperties: { class: 'relative group flex items-center ' },
    behavior: "append",
    properties: {
      ariaHidden: true,
      class: 'invisible group-hover:visible absolute pr-fluid-3xs right-full text-link no-underline text-[0.60em]',
    },
  },
];

// https://astro.build/config
export default defineConfig({
  site: 'https://bypete.uk',
  trailingSlash: 'always',
  compressHTML: true,
  experimental: {
    fonts: [
      {
        name: 'Reddit Sans Condensed',
        cssVariable: '--font-reddit-sans-condensed',
        provider: fontProviders.fontsource(),
        weights: ["200 900"],
        formats: ["woff2", "woff"],
        fallbacks: ["sans-serif"],
      },
      {
        name: "Inter",
        cssVariable: "--font-inter",
        provider: fontProviders.fontsource(),
        weights: ["200 900"],
        formats: ["woff2", "woff"],
      },],
    svgo: {
      plugins: SVGOConfig.plugins
    },
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
          rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig, rehypeHeadingIds, rehypeAutolinkHeadingsConfig],
      }),
      icon({
          include: {
              mdi: ['*'],
              lucide: ['*'],
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
      remarkPlugins: [remarkReadingTime, remarkExtractHeadings],
      rehypePlugins: [rehypeAttrs, rehypeExternalLinksConfig, rehypeHeadingIds, rehypeAutolinkHeadings],
  },

vite: {
  plugins: [
    arraybuffer(),
    svgr({
      svgrOptions: {
        ref: true, 
        titleProp: true,
        svgo: true,
        svgoConfig: SVGOConfig,
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
},

});