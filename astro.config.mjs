import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // Налаштування мов залишаємо — вони ідеальні
  i18n: {
    defaultLocale: 'uk',
    locales: ['uk', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    mdx(),
    keystatic()
  ],
  // Astro 6 тепер сам зрозуміє, де статика, а де динаміка
  output: 'static' 
});