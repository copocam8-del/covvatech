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
    resumen: 'Una página pensada para convertir visitas en consultas.',
    descripcion:
      'Ideal para lanzar un producto, promocionar un servicio o acompañar una campaña. Cada sección está ordenada para que quien entra entienda rápido qué ofrecés y te escriba.',
    incluye: [
      'Diseño a medida, alineado a tu marca',
      'Estructura y textos ordenados en función del objetivo',
      'Acceso directo a tu contacto o WhatsApp',
      'Pensada primero para celulares',
    ],
    paraQuien: 'Lanzamientos, campañas publicitarias y profesionales que quieren captar clientes.',
    icono: 'landing',
  },
  {
    id: 'institucional',
    nombre: 'Sitios institucionales',
    resumen: 'La carta de presentación de tu marca.',
    descripcion:
      'Un sitio que transmite confianza desde el primer vistazo: quiénes son, qué hacen y cómo contactarlos, con una imagen a la altura de tu marca en cualquier dispositivo.',
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
    resumen: 'Tu tienda abierta las 24 horas.',
    descripcion:
      'Un catálogo claro y una compra simple, para que tus clientes compren sin trabas y vos gestiones productos, stock y pedidos desde un solo lugar.',
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
    resumen: 'Menos planillas, más control de tu operación.',
    descripcion:
      'Turnos, clientes, stock, presupuestos o reportes: sistemas que se adaptan a cómo trabaja tu equipo, para ahorrar tiempo y tener la información al día. Se usan desde el navegador, sin instalar nada.',
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
    resumen: 'Para problemas que no tienen una solución estándar.',
    descripcion:
      'Partimos de tu problema, no de una plantilla. Analizamos el caso con vos y diseñamos una solución que puede combinar varias de las anteriores.',
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
