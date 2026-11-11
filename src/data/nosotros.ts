/**
 * Contenido de la sección "Nosotros".
 * Los datos de la fundadora y del equipo quedan como [Pendiente: …] hasta tenerlos.
 * Para agregar una foto, guardala en src/assets/equipo/ y poné el nombre del archivo en `foto`.
 */
export const valores = [
  {
    titulo: 'Compromiso',
    texto: 'Nos hacemos cargo de cada proyecto como si fuera propio, de la primera charla al lanzamiento.',
    icono: 'compromiso',
  },
  {
    titulo: 'Atención personalizada',
    texto: 'Hablás siempre con las mismas personas, que conocen tu proyecto y responden con claridad.',
    icono: 'atencion',
  },
  {
    titulo: 'Soluciones a medida',
    texto: 'Partimos de lo que necesitás vos, no de una plantilla que hay que forzar para que encaje.',
    icono: 'medida',
  },
  {
    titulo: 'Calidad',
    texto: 'Cuidamos el diseño, el funcionamiento y los detalles, aunque no se vean a simple vista.',
    icono: 'calidad',
  },
  {
    titulo: 'Acompañamiento',
    texto: 'Después del lanzamiento seguimos cerca, con el alcance que defina el plan que contrates.',
    icono: 'acompanamiento',
  },
] as const;

export const fundadora = {
  nombre: '[Pendiente: nombre de la fundadora]',
  rol: '[Pendiente: rol]',
  bio: '[Pendiente: breve presentación de la fundadora, en dos o tres líneas]',
  foto: '', // ej.: 'fundadora.jpg'
};

/** Integrantes del equipo. Si no hay equipo, dejar la lista vacía y el bloque no se muestra. */
export const equipo: { nombre: string; rol: string; foto: string }[] = [
  { nombre: '[Pendiente: nombre]', rol: '[Pendiente: rol]', foto: '' },
  { nombre: '[Pendiente: nombre]', rol: '[Pendiente: rol]', foto: '' },
];
