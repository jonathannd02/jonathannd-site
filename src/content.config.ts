import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ base: './src/content/notities', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    number: z.string(),
    category: z.string(),
    published: z.coerce.date(),
    coverAlt: z.string().optional(),
  }),
});

export const collections = { notes };
