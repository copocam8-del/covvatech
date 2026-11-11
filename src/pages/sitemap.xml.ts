import type { APIRoute } from 'astro';
import { sitio } from '../config/sitio';

/**
 * Sitemap del sitio (una sola página).
 * Necesita el dominio en src/config/sitio.ts; mientras no esté, sale vacío.
 */
export const GET: APIRoute = () => {
  const urls = sitio.url
    ? `  <url>\n    <loc>${sitio.url}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>\n`
    : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
