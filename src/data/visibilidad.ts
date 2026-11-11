/**
 * Qué partes del sitio se muestran según los datos cargados.
 * Nada se borra: los bloques sin datos reales quedan ocultos y reaparecen solos
 * en cuanto se completan los archivos de datos y se vuelve a generar el sitio.
 */
import proyectosJson from './proyectos.json';
import { fundadora, equipo } from './nosotros';
import { planes } from './suscripcion';
import { navegacion } from './navegacion';
import { tieneDato } from '../config/sitio';

/* ---------- Proyectos: cuentan solo los que tienen nombre real ---------- */
export interface Proyecto {
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string;
  enlace: string;
}
export const proyectosReales = (proyectosJson as Proyecto[]).filter((p) => tieneDato(p.nombre));
export const hayProyectos = proyectosReales.length > 0;

/* ---------- Nosotros ---------- */
export const hayFundadora = tieneDato(fundadora.nombre);
export const equipoReal = equipo.filter((m) => tieneDato(m.nombre));
export const hayEquipo = equipoReal.length > 0;

/* ---------- Planes: cuentan solo los que tienen nombre real ---------- */
export const planesReales = planes.filter((p) => tieneDato(p.nombre));
export const hayPlanes = planesReales.length > 0;

/* ---------- Menú: sin proyectos, el enlace no aparece ---------- */
export const navegacionVisible = navegacion.filter((n) => n.id !== 'proyectos' || hayProyectos);
