/**
 * Contenido de la sección "Nosotros".
 * Fotos: guardarlas en src/assets/equipo/ con el nombre indicado en `foto`.
 * Mientras la foto no exista, se muestran las iniciales del nombre en un círculo.
 */
export const valores = [
  {
    titulo: 'Compromiso',
    texto: 'Tratamos cada proyecto como si fuera propio, de la primera charla al lanzamiento y después.',
    icono: 'compromiso',
  },
  {
    titulo: 'Atención personalizada',
    texto: 'Hablás directamente con quien diseña y desarrolla tu proyecto.',
    icono: 'atencion',
  },
  {
    titulo: 'Soluciones a medida',
    texto: 'Partimos de cómo funciona tu negocio, no de una plantilla que hay que forzar.',
    icono: 'medida',
  },
  {
    titulo: 'Calidad',
    texto: 'Cuidamos el diseño, el funcionamiento y cada detalle, incluso los que no se ven.',
    icono: 'calidad',
  },
  {
    titulo: 'Acompañamiento',
    texto: 'Después del lanzamiento seguimos cerca, con el alcance que defina el plan que contrates.',
    icono: 'acompanamiento',
  },
] as const;

export const fundadora = {
  nombre: 'Camila Copo',
  rol: 'Fundadora y desarrolladora',
  bio: 'Estoy cursando el último año de Analista de Sistemas y combino esa formación con proyectos reales: diseñé y desarrollé de punta a punta plataformas como Corta La Bocha, Cleo y RouteControl. Creé Covva para que cada negocio trabaje directamente con quien piensa y construye su solución, sin intermediarios.',
  /** Se usa automáticamente cuando exista src/assets/equipo/foto-fundadora.jpg (también acepta .jpeg, .png o .webp) */
  foto: 'foto-fundadora.jpg',
};

/**
 * Integrantes del equipo. Por ahora Covva es un proyecto unipersonal, así que la lista
 * está vacía y el bloque no se muestra. Para sumar a alguien:
 *   { nombre: 'Nombre Apellido', rol: 'Rol', foto: 'archivo.jpg' }
 */
export const equipo: { nombre: string; rol: string; foto: string }[] = [];
