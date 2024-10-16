// Import utilities from `astro:content`
import { defineCollection, reference, z } from "astro:content";

const ogSchema = (image) =>
  z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.object({
      src: image().refine((img) => img.width >= 1200, {
        message: "OG image must be at least 1200 wide!",
      }),
      alt: z.string(),
    }).optional(),
  }).optional();


// Define a `type` and `schema` for each collection

const postsCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
      title: z.string(),
      pubDate: z.date(),
      modDate: z.date().optional(),
      taster: z.string(),
      excerpt: z.string().optional(),
    description: z.string(),
      author: z.string(),
      cover: z.object({
        src: image().refine((img) => img.width >= 500, {
          message: "cover image must be at least 500 wide!",
        }),
        alt: z.string(),
        credit: z.string().optional()
      }).optional(),
      splash: z.object({
        src: image().refine((img) => img.width >= 500, {
          message: "splash image must be at least 500 wide!",
        }),
        alt: z.string(),
        credit: z.string().optional()
      }).optional(),
      socialImage: z.object({
        src: image().refine((img) => img.width >= 315, {
            message: "social image must be at least 315 wide!",
        }),
        alt: z.string(),
      }).optional(),
      tags: z.array(z.string())
    })
});
const workCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.date(),
    modDate: z.date().optional(),
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
      src: image().refine((img) => img.width >= 500, {
        message: "cover image must be at least 500 wide!",
      }),
      alt: z.string(),
      credit: z.string().optional(),
    }),
    product: z.object({
      src: image().optional(),
      alt: z.string().optional(),
    }).optional(),
    splash: z.object({
      src: image().refine((img) => img.width >= 500, {
        message: "splash image must be at least 500 wide!",
      }),
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
  type: 'data',
  schema: ({ image }) =>
    z.object({
    path: z.string(),
    images: z.array(
      z.object({
        title: z.string(),
        src: image()
        .refine((img) => img.width >= 600, {
          message: "Gallery image must be at least 600px wide!",
        }),
        class: z.string().optional(),
        caption: z.string().optional(),
        cropped: z.boolean().optional(),
        }),
      ),
  })
});

const heroSlides = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    url: z.string().optional(),
    cover: z.object({
      src: image().refine((img) => img.width >= 1800, {
        message: "cover image must be at least 1800px wide!",
      }),
      alt: z.string(),
      credit: z.string().optional(),
    }),
  })
})
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  work: workCollection,
  'hero': heroSlides,
  galleries,
};