// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: "./src/content/works" }),
  schema: ({ image }) => z.object({
    category: z.enum(['print', 'web', 'brand', '3d']).optional(),
    
    title_uk: z.string(),
    title_en: z.string().optional(),
    
    description_uk: z.string(),
    description_en: z.string().optional(),
    
    publishDate: z.coerce.date().optional(),
    
    location_uk: z.string().optional(),
    location_en: z.string().optional(),
    
    coverImage_uk: image().optional(),
    coverImage_en: image().optional(),
    
    youtubeId: z.string().optional(),
    projectUrl: z.string().url().optional(),
    
    orientation: z.enum(['landscape', 'portrait', 'square']).optional(),
    aspectRatio: z.string().optional(),
    
    desktopDesign: image().optional(),
    tabletDesign: image().optional(),
    phoneDesign: image().optional(),
    
    gallery: z.array(image()).optional(),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/settings" }),
  schema: z.object({
    siteTitle: z.string(),
    siteDescription_uk: z.string().optional(),
    siteDescription_en: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { works, settings };