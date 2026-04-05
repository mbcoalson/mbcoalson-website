import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const citizenScientist = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/citizen-scientist' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    authors: z.string(),
    linkedinUrl: z.string().optional(),
    sourceUrl: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { essays, 'citizen-scientist': citizenScientist };
