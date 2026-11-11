/**
 * Control previo a publicar: revisa que ningún "[Pendiente" haya llegado a los
 * archivos generados en dist/. Se ejecuta automáticamente con `npm run build`.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const carpeta = 'dist';
const extensiones = new Set(['.html', '.xml', '.txt', '.json', '.webmanifest']);

async function* archivos(dir) {
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) yield* archivos(ruta);
    else if (extensiones.has(extname(entrada.name))) yield ruta;
  }
}

const hallazgos = [];
for await (const ruta of archivos(carpeta)) {
  const texto = await readFile(ruta, 'utf8');
  for (const m of texto.matchAll(/\[Pendiente[^\]]*\]/g)) hallazgos.push(`${ruta}: ${m[0]}`);
}

if (hallazgos.length) {
  console.error(`\n✗ Hay ${hallazgos.length} texto(s) [Pendiente] en el sitio generado:`);
  hallazgos.forEach((h) => console.error('  ' + h));
  console.error('Completá esos datos o revisá que queden ocultos antes de publicar.\n');
  process.exit(1);
}
console.log('✓ Sin textos [Pendiente] en el sitio generado.');
