# Covva — sitio institucional

Sitio estático de una sola página hecho con [Astro](https://astro.build), con CSS propio y JavaScript liviano. Se publica en [Render](https://render.com) como *Static Site*, conectado a este repositorio de GitHub.

## Requisitos

- Node.js 24 (la versión está fijada en `.node-version`; Render la usa automáticamente)

## Comandos

| Comando           | Qué hace                                                                      |
| ----------------- | ----------------------------------------------------------------------------- |
| `npm install`     | Instala las dependencias (solo la primera vez)                                |
| `npm run dev`     | Abre el sitio en modo desarrollo en http://localhost:4321                     |
| `npm run build`   | Genera el sitio en `dist/` y verifica que no quede ningún `[Pendiente]` visible |
| `npm run preview` | Muestra localmente la versión generada en `dist/`                             |

## Dónde se edita cada cosa

- **Datos de contacto, redes, formulario y dominio:** `src/config/sitio.ts`
- **Menú:** `src/data/navegacion.ts`
- **Servicios:** `src/data/servicios.ts`
- **Proyectos:** `src/data/proyectos.json` (imágenes en `src/assets/proyectos/`). Cada proyecto tiene `nombre`, `categoria`, `descripcion`, `imagen` (nombre del archivo) y `enlace`, y además los campos opcionales `estado` (`"Publicado"` o `"En desarrollo"`), `funciones` (lista de 3 ítems cortos) e `imagenAlt` (descripción de la imagen para lectores de pantalla). Si `enlace` queda vacío, la tarjeta no muestra el botón "Ver proyecto".
- **Nosotros, fundadora y equipo:** `src/data/nosotros.ts` (fotos en `src/assets/equipo/`)
- **Cómo trabajamos:** `src/data/proceso.ts`
- **Suscripción y planes:** `src/data/suscripcion.ts`
- **Preguntas frecuentes:** `src/data/faq.ts`
- **Colores, tipografías y espacios:** `src/styles/tokens.css`
- **Logo:** `src/assets/brand/` (recortes del archivo original `logocovva.jpeg`)

## Contenido que aparece solo cuando se carga

Para que el sitio no muestre datos incompletos, algunos bloques quedan ocultos hasta que tienen información real (cualquier texto vacío o que empiece con `[Pendiente` cuenta como "sin dato"). La lógica está en `src/data/visibilidad.ts`.

| Bloque | Aparece cuando… |
| --- | --- |
| Sección **Proyectos** y su enlace en el menú y el footer | `proyectos.json` tiene al menos un proyecto con `nombre` real |
| Bloque **Fundadora** | `fundadora.nombre` en `nosotros.ts` tiene un nombre real |
| Bloque **Equipo** | algún integrante de `equipo` tiene `nombre` real |
| **Tarjetas de planes** (si no, se ve el bloque "Armamos un plan a medida…") | algún plan de `suscripcion.ts` tiene `nombre` real |
| Línea de **condiciones** de la suscripción | `condiciones` en `suscripcion.ts` tiene un texto real |

Dentro de un proyecto o un plan, los campos que falten (imagen, enlace, precio, etc.) simplemente no se muestran.

Como control extra, `npm run build` falla si encuentra algún `[Pendiente` en el sitio generado, para que no se publique por error.

## Formulario de contacto (Formspree)

El formulario envía las consultas a Formspree (`formulario.endpoint` en `src/config/sitio.ts`). Los mensajes llegan al correo de la cuenta de Formspree.

Si el envío falla, revisar en el panel de Formspree que el formulario esté confirmado y que **reCAPTCHA esté desactivado** (el sitio envía el formulario sin recargar la página, y Formspree solo lo admite sin reCAPTCHA).

## Publicar en Render

La configuración está en `render.yaml`: comando de build, carpeta de publicación y cabeceras de seguridad y caché.

### Opción A — Blueprint (recomendada: toma todo de `render.yaml`)

1. En [dashboard.render.com](https://dashboard.render.com): **New → Blueprint**.
2. Conectar la cuenta de GitHub y elegir este repositorio.
3. Render detecta `render.yaml` y muestra el servicio `covva-web`. Confirmar con **Apply**.
4. Cada `git push` a la rama `main` vuelve a publicar el sitio automáticamente.

### Opción B — Static Site manual

1. **New → Static Site** y elegir este repositorio.
2. Completar:
   - **Branch:** `main`
   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `dist`
3. Crear el sitio. Después, en **Settings → Headers**, agregar estas reglas (con esta opción, `render.yaml` no se aplica):

| Path | Header | Value |
| --- | --- | --- |
| `/*` | `X-Content-Type-Options` | `nosniff` |
| `/*` | `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `/*` | `X-Frame-Options` | `SAMEORIGIN` |
| `/*` | `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `/_astro/*` | `Cache-Control` | `public, max-age=31536000, immutable` |
| `/*.png` | `Cache-Control` | `public, max-age=2592000` |
| `/favicon.ico` | `Cache-Control` | `public, max-age=2592000` |

Render se encarga del certificado HTTPS, la redirección de HTTP a HTTPS y la compresión.

## Cuando esté definido el dominio

1. En Render: **Settings → Custom Domains → Add Custom Domain** y seguir las instrucciones para configurar los registros DNS en el proveedor del dominio. Render emite el certificado HTTPS solo.
2. Completar `url` en `src/config/sitio.ts` (por ejemplo `'https://www.covva.com.ar'`, sin barra final) y hacer `git push`. Así se completan automáticamente la URL canónica, la imagen para redes, el `sitemap.xml` y el `robots.txt`.
3. Dar de alta el sitio en Google Search Console y enviar el sitemap (`/sitemap.xml`).
