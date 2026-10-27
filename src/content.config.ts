import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experiments' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    thread: z.string().optional(),
    code: z.string().url().optional(),
    logs: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

// Random: the blog. Same fields as experiments, minus code and logs.
const random = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/random' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    original: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { experiments, random };
