// Import utilities from `astro:content`
import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const ogSchema = (image) =>
  z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.object({
      src: image(),
      alt: z.string(),
    }).optional(),
  }).optional();


// Define a `type` and `schema` for each collection
const work = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/work" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    modDate: z.coerce.date().optional(),
    taster: z.string(),
    excerpt: z.string(),
    description: z.string(),
    author: z.string(),
    brand: z.object({
      bg: z.string(),
      color: z.string(),
    }),
    logo: z.object({
      src: image().optional(),
      light: image().optional(),
    }).optional(),
    cover: z.object({
      src: image(),
      alt: z.string(),
      credit: z.string().optional(),
    }),
    product: z.object({
      src: image().optional(),
      alt: z.string().optional(),
    }).optional(),
    splash: z.object({
      src: image(),
      alt: z.string(),
      credit: z.string().optional()
    }).optional(),
    skillset: z.object({
      text: z.string(),
      icon: z.string(),
      heading: z.string(),
      shadow: z.string(),
      areas: z.array(
        z.object({
          title: z.string(),
          skills: z.array(z.string())
          })
        ),
      }),
      gallery: reference('galleries').optional(),
      relatedPosts: z.array(reference ("work")).optional(),
      og: ogSchema(image).optional(),
      tags: z.array(z.string()).optional(),
      readingTime: z.string().optional(), // readingTime frontmatter
  })
});
const galleries = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/galleries" }),
  schema: ({ image }) =>
    z.object({
    images: z.array(
      z.object({
        title: z.string(),
        src: image(),
        class: z.string().optional(),
        caption: z.string().optional(),
        cropped: z.boolean().optional(),
        }),
      ),
  })
});

// Export a single `collections` object to register your collection(s)
export const collections = {
  work,
  galleries,
};