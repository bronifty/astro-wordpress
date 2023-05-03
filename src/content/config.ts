// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)

const blog = defineCollection({
  schema: z.object({
    title: z.string().default("new blog post"),
    description: z.string().default("new blog post"),
    date: z.date().default(() => new Date()),
    draft: z.boolean().default(false),
    author: z.string().default("Brother Nifty"),
    category: z.string().default("codes"),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog,
};
