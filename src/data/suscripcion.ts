/**
 * Modelo de contratación.
 * `componentes`: qué PUEDE formar parte de la suscripción (depende del plan).
 * `planes`: completar cuando estén definidos. Se muestran tantas tarjetas como planes haya.
 */
export const componentes = [
  {
    titulo: 'Desarrollo',
    texto: 'El diseño y la construcción de tu sitio, tienda o sistema.',
  },
  {
    titulo: 'Alojamiento',
    texto: 'El espacio donde tu web queda publicada y disponible.',
  },
  {
    titulo: 'Mantenimiento',
    texto: 'Actualizaciones y controles para que todo siga funcionando bien.',
  },
  {
    titulo: 'Soporte',
    texto: 'Un canal para consultas, problemas o pedidos de cambios.',
  },
];

export const planes = [
  {
    nombre: '[Pendiente: nombre del plan]',
    precio: '[Pendiente: precio mensual]',
    descripcion: '[Pendiente: para quién es este plan]',
    incluye: ['[Pendiente: qué incluye]'],
  },
  {
    nombre: '[Pendiente: nombre del plan]',
    precio: '[Pendiente: precio mensual]',
    descripcion: '[Pendiente: para quién es este plan]',
    incluye: ['[Pendiente: qué incluye]'],
  },
  {
    nombre: '[Pendiente: nombre del plan]',
    precio: '[Pendiente: precio mensual]',
    descripcion: '[Pendiente: para quién es este plan]',
    incluye: ['[Pendiente: qué incluye]'],
  },
];

/** Precio de referencia que se muestra en la sección y en las preguntas frecuentes. */
export const precioDesde = '$100.000';

export const condiciones =
  '[Pendiente: condiciones generales de la suscripción (duración mínima, forma de pago, qué pasa al darla de baja)]';
