// src/pages/api/translate.ts
import type { APIRoute } from 'astro';

// Вказуємо Astro, що цей маршрут динамічний
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { text, target } = await request.json();

    if (!text) {
      return new Response(JSON.stringify({ error: 'No text provided' }), { status: 400 });
    }

    // Використовуємо безкоштовний "дзеркальний" API Google Translate
    // sl=uk (source language), tl=en (target language)
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=uk&tl=${target || 'en'}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url);
    const data = await response.json();

    // Google повертає масив масивів, дістаємо саме текст перекладу
    const translatedText = data[0].map((item: any) => item[0]).join('');

    return new Response(JSON.stringify({ translatedText }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Translation error:', error);
    return new Response(JSON.stringify({ error: 'Translation failed' }), { status: 500 });
  }
};