import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string(),
    category: z.enum(['Actividades', 'Eventos', 'Reivindicaciones', 'Noticias', 'Recursos']),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    altText: z.string().optional(),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
