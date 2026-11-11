// @ts-check
import { defineConfig } from 'astro/config';

// Cuando tengamos el dominio definitivo, completarlo en src/config/sitio.ts (campo `url`)
// y también acá en `site`, para que se generen bien las URLs canónicas y de Open Graph.
export default defineConfig({
  // site: 'https://www.ejemplo.com',
  build: {
    // Genera rutas como /index.html: compatible con cualquier hosting estático (Render incluido).
    format: 'file',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
