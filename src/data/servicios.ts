/**
 * Servicios de Covva.
 * Para editar textos, cambiá los valores de cada servicio.
 * - `id`: identificador interno (lo usa el formulario de contacto para preseleccionar el servicio).
 * - `icono`: uno de los nombres definidos en src/components/Icono.astro.
 */
export interface Servicio {
  id: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  incluye: string[];
  paraQuien: string;
  icono: 'landing' | 'institucional' | 'tienda' | 'sistema' | 'medida';
}

export const servicios: Servicio[] = [
  {
    id: 'landing',
    nombre: 'Landing pages',
    resumen: 'Una página enfocada en un solo objetivo.',
    descripcion:
      'Ideal para presentar un producto, un servicio o una campaña. Todo el contenido está pensado para que quien entra entienda rápido qué ofrecés y te contacte.',
    incluye: [
      'Diseño a medida, alineado a tu marca',
      'Estructura y textos ordenados en función del objetivo',
      'Acceso directo a tu contacto o WhatsApp',
      'Pensada primero para celulares',
    ],
    paraQuien: 'Lanzamientos, campañas y profesionales que necesitan presencia online clara.',
    icono: 'landing',
  },
  {
    id: 'institucional',
    nombre: 'Sitios institucionales',
    resumen: 'Tu presencia completa en internet.',
    descripcion:
      'Un sitio que cuenta quiénes son, qué hacen y cómo contactarlos, con una imagen a la altura de tu marca y fácil de recorrer desde cualquier dispositivo.',
    incluye: [
      'Varias secciones o páginas, según lo que necesites comunicar',
      'Diseño coherente con tu identidad visual',
      'Formulario de contacto y enlaces a tus redes',
      'Configuración básica para buscadores',
    ],
    paraQuien: 'Empresas, estudios, consultorios, instituciones y marcas personales.',
    icono: 'institucional',
  },
  {
    id: 'tienda',
    nombre: 'Tiendas online',
    resumen: 'Vendé por internet, con todo en orden.',
    descripcion:
      'Una tienda con catálogo, carrito y proceso de compra claro, para que tus clientes compren sin fricciones y vos puedas gestionar productos y pedidos.',
    incluye: [
      'Catálogo organizado por categorías',
      'Carrito y proceso de compra simple',
      'Medios de pago y envío a definir según tu caso',
      'Gestión de productos, stock y pedidos',
    ],
    paraQuien: 'Comercios, marcas y emprendimientos que venden productos.',
    icono: 'tienda',
  },
  {
    id: 'sistema',
    nombre: 'Sistemas y aplicaciones web',
    resumen: 'Herramientas para ordenar tu operación.',
    descripcion:
      'Turnos, clientes, stock, presupuestos o reportes: desarrollamos sistemas que se adaptan a cómo trabaja tu equipo y se usan desde el navegador, sin instalar nada.',
    incluye: [
      'Relevamiento de tus procesos actuales',
      'Usuarios con distintos permisos',
      'Paneles e informes con la información que necesitás',
      'Acceso desde computadora, tablet o celular',
    ],
    paraQuien: 'Negocios y equipos que hoy se organizan con planillas o mensajes sueltos.',
    icono: 'sistema',
  },
  {
    id: 'medida',
    nombre: 'Soluciones a medida',
    resumen: 'Cuando lo que necesitás no entra en una categoría.',
    descripcion:
      'Partimos de tu problema, no de una plantilla. Analizamos el caso con vos y proponemos una solución que puede combinar varias de las anteriores.',
    incluye: [
      'Análisis del problema y del contexto',
      'Propuesta adaptada a tus prioridades',
      'Conexión con herramientas que ya usás, cuando sea posible',
      'Desarrollo por etapas',
    ],
    paraQuien: 'Proyectos específicos o necesidades que todavía no tienen forma definida.',
    icono: 'medida',
  },
];
