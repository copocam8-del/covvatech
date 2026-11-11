import type { APIRoute } from 'astro';
import { sitio } from '../config/sitio';

/** robots.txt: cuando haya dominio en src/config/sitio.ts, agrega la ubicación del sitemap. */
export const GET: APIRoute = () => {
  const lineas = ['User-agent: *', 'Allow: /'];
  if (sitio.url) lineas.push('', `Sitemap: ${sitio.url}/sitemap.xml`);
  return new Response(lineas.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
