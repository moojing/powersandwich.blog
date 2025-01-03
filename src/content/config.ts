import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().optional(),
      date: z
      .string()
      .or(z.date())
      .transform((val) =>
        new Date(val).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      ),
      tags: z.array(z.string()).optional(),
      // image or image url 
      cover: image().optional().or(z.string()) ,
    }),
});

export const collections = { blog };
