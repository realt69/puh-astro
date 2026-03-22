// keystatic.config.tsx
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  
  singletons: {
    settings: singleton({
      label: '⚙️ Налаштування SEO',
      path: 'src/content/settings/index',
      format: { data: 'json' }, 
      schema: {
        siteTitle: fields.text({ label: 'Базова назва сайту' }),
        siteDescription_uk: fields.text({ label: '🇺🇦 Глобальний опис (UA)', multiline: true }),
        siteDescription_en: fields.text({ label: '🇬🇧 Глобальний опис (EN)', multiline: true }),
        ogImage: fields.image({
          label: 'Картинка для соцмереж (OG Image)',
          directory: 'public/images/seo',
          publicPath: '/images/seo/'
        }),
      },
    }),
  },

  collections: {
    works: collection({
      label: 'Selected Works (Проєкти)',
      slugField: 'title_en',
      path: 'src/content/works/*/', 
      format: { contentField: 'content_uk' }, 
      columns: ['title_uk', 'publishDate', 'category'],
      
      // === ТВІЙ ІДЕАЛЬНИЙ ПОРЯДОК ===
      schema: {
        category: fields.select({
          label: 'Категорія проєкту',
          options: [
            { label: 'Дизайн поліграфії (Print)', value: 'print' },
            { label: 'Розробка сайтів (Web)', value: 'web' },
            { label: 'Розробка бренду (Brand)', value: 'brand' },
            { label: '3D простір (3D)', value: '3d' },
          ],
          defaultValue: 'print'
        }),

        title_uk: fields.text({ label: '🇺🇦 Назва (UA)' }),
        title_en: fields.slug({ name: { label: '🇬🇧 Title (EN)' } }),

        description_uk: fields.text({ label: '🇺🇦 Короткий опис (UA)', multiline: true }),
        description_en: fields.text({ label: '🇬🇧 Short Description (EN)', multiline: true }),

        content_uk: fields.mdx({ label: '🇺🇦 Content Укр' }),
        content_en: fields.mdx({ label: '🇬🇧 Content Eng' }),

        publishDate: fields.date({ label: 'Дата публікації' }),

        location_uk: fields.text({ label: '🇺🇦 Локація (Місто, Країна)' }),
        location_en: fields.text({ label: '🇬🇧 Location (City, Country)' }),

        coverImage_uk: fields.image({
          label: '🖼️ Головне зображення (UA)',
          directory: 'src/content/works',
        }),
        coverImage_en: fields.image({
          label: '🖼️ Головне зображення (EN)',
          directory: 'src/content/works',
        }),

        youtubeId: fields.text({ label: 'Код відео YouTube' }),
        projectUrl: fields.url({ label: '🔗 Посилання на проєкт (зовнішнє)' }),

        orientation: fields.select({
          label: 'Орієнтація видання',
          options: [
            { label: 'Ландшафтна (Landscape)', value: 'landscape' },
            { label: 'Портретна (Portrait)', value: 'portrait' },
            { label: 'Квадратна (Square)', value: 'square' },
          ],
          defaultValue: 'landscape'
        }),
        aspectRatio: fields.text({ label: 'Співвідношення сторін (напр. 16:9, 4:5)' }),

        desktopDesign: fields.image({
          label: '💻 Дизайн: Десктоп',
          directory: 'src/content/works',
        }),
        tabletDesign: fields.image({
          label: '📱 Дизайн: Планшет',
          directory: 'src/content/works',
        }),
        phoneDesign: fields.image({
          label: '📱 Дизайн: Телефон',
          directory: 'src/content/works',
        }),

        gallery: fields.array(
          fields.image({
            label: 'Фото',
            directory: 'src/content/works',
          }),
          {
            label: '📸 Галерея зображень',
            itemLabel: props => props.value ? 'Фото завантажено' : 'Нове фото'
          }
        ),
      },
    }),
  },
});