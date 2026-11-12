/**
 * Configuración general del sitio.
 * Este es el ÚNICO archivo que hay que tocar para cambiar datos de contacto,
 * redes, el servicio del formulario o el dominio.
 *
 * Mientras un dato no esté definido, se deja con el formato "[Pendiente: …]"
 * y el sitio lo muestra tal cual, para que sea fácil detectarlo.
 */

export const sitio = {
  nombre: 'Covva',

  /** Dominio definitivo, sin barra final. Ej.: 'https://www.covva.com.ar' */
  url: '', // [Pendiente: dominio]

  titulo: 'Covva | Sitios, tiendas online y sistemas a medida por suscripción',
  descripcion:
    'Consultora tecnológica: sitios, tiendas online y sistemas web a medida para tu negocio, por suscripción mensual desde $100.000.',

  idioma: 'es-AR',
  colorTema: '#08070D',

  contacto: {
    /** Número en formato internacional, solo dígitos. Ej.: '5491112345678' */
    whatsapp: '5491169378663',
    /** Número tal como se muestra en pantalla. Ej.: '+54 9 11 1234-5678' */
    whatsappVisible: '+54 9 11 6937-8663',
    /** Mensaje que aparece precargado al abrir WhatsApp */
    whatsappMensaje: 'Hola, quiero hacer una consulta sobre un proyecto web.',
    /** Usuario sin @. Ej.: 'covva.tech' */
    instagram: 'covvatech',
    email: 'covvatech@gmail.com',
  },

  formulario: {
    /**
     * Endpoint de Formspree. Ej.: 'https://formspree.io/f/abcdwxyz'
     * Cómo obtenerlo: crear una cuenta en formspree.io → "New form" → copiar la URL
     * que aparece en "Integration". Los mensajes llegan al correo de esa cuenta.
     */
    endpoint: 'https://formspree.io/f/xaeoyobz',
    /** Asunto del correo que recibe Covva con cada consulta */
    asunto: 'Nueva consulta desde la web de Covva',
  },
} as const;

/** Devuelve true si el valor todavía es un texto provisorio. */
export const esPendiente = (valor: string) => valor.startsWith('[Pendiente');

/** Devuelve true si el valor tiene un dato real (no está vacío ni pendiente). */
export const tieneDato = (valor?: string | null): valor is string =>
  Boolean(valor && valor.trim()) && !esPendiente(valor!.trim());

/** Enlaces de contacto listos para usar. `href` es null mientras el dato esté pendiente. */
const c = sitio.contacto;
export const canales = {
  whatsapp: {
    etiqueta: 'WhatsApp',
    texto: c.whatsappVisible,
    href: esPendiente(c.whatsapp)
      ? null
      : `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMensaje)}`,
  },
  instagram: {
    etiqueta: 'Instagram',
    texto: esPendiente(c.instagram) ? c.instagram : `@${c.instagram}`,
    href: esPendiente(c.instagram) ? null : `https://www.instagram.com/${c.instagram}/`,
  },
  correo: {
    etiqueta: 'Correo',
    texto: c.email,
    href: esPendiente(c.email) ? null : `mailto:${c.email}`,
  },
} as const;

export const formularioListo = !esPendiente(sitio.formulario.endpoint);
