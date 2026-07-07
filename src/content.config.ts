import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    intro: z.string(),
    order: z.number(),
    image: z.string().optional(),
    symptoms: z.array(z.string()),
    whenToConsult: z.array(z.string()),
    treatments: z.array(z.object({ title: z.string(), text: z.string() })),
    faq: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
  }),
});

export const collections = { services, blog };
