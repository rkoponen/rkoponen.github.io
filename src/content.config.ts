import { defineCollection } from "astro:content";

import { glob, file } from "astro/loaders";

import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(["fi", "en"]).default("fi"),
    updatedDate: z.coerce.date().optional(),
  }),
});

const reseptit = defineCollection({
  loader: glob({ base: "./src/content/reseptit", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    annokset: z.number().optional(),
    valmistusaika: z.string().optional(),
    tagit: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = {
  blog,
  reseptit,
};
