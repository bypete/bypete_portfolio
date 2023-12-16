// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});
const workCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.date(),
    modDate: z.date().optional(),
    readtime: z.string(),
    taster: z.string(),
    description: z.string(),
    author: z.string(),
    cover: z.object({
      url: image().refine((img) => img.width >= 500, {
        message: "cover image must be at least 500 wide!",
      }),
      alt: z.string(),
      credit: z.string().optional()
    }),
    socialImage: z.object({
      url: image().refine((img) => img.width >= 315, {
          message: "social image must be at least 315 wide!",
      }),
      alt: z.string(),
    }).optional(),
    skillset: z.object({
      bg: z.string(),
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
      tags: z.array(z.string())
  })


});
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  work: workCollection,
};