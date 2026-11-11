/**
 * Servicios: en celular funciona como acordeón; en escritorio, como lista con
 * un panel de detalle (siempre hay uno abierto).
 * También recuerda qué servicio se eligió con "Consultar por este servicio"
 * para preseleccionarlo en el formulario de contacto.
 */
export const EVENTO_SERVICIO = 'covva:servicio';

export function iniciarServicios() {
  const raiz = document.querySelector<HTMLElement>('[data-servicios]');
  if (!raiz) return;

  const botones = [...raiz.querySelectorAll<HTMLButtonElement>('[data-serv-boton]')];
  const escritorio = window.matchMedia('(min-width: 960px)');

  const panelDe = (b: HTMLButtonElement) =>
    document.getElementById(b.getAttribute('aria-controls')!) as HTMLElement;

  const abrir = (objetivo: HTMLButtonElement | null) => {
    botones.forEach((b) => {
      const abierto = b === objetivo;
      b.setAttribute('aria-expanded', String(abierto));
      panelDe(b).hidden = !abierto;
    });
  };

  // Estado inicial: el primero abierto
  abrir(botones[0]);

  botones.forEach((b, i) => {
    b.addEventListener('click', () => {
      const yaAbierto = b.getAttribute('aria-expanded') === 'true';
      // En celular se puede cerrar el que está abierto; en escritorio siempre queda uno.
      if (yaAbierto && !escritorio.matches) abrir(null);
      else abrir(b);
    });

    // Flechas arriba/abajo para moverse entre servicios
    b.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      const siguiente = botones[(i + (e.key === 'ArrowDown' ? 1 : -1) + botones.length) % botones.length];
      siguiente.focus();
    });
  });

  // Enlaces desde otras partes del sitio (por ejemplo, el footer) que abren un servicio puntual
  document.querySelectorAll<HTMLAnchorElement>('[data-abrir-servicio]').forEach((a) => {
    a.addEventListener('click', () => {
      const boton = document.getElementById(`serv-boton-${a.dataset.abrirServicio}`) as HTMLButtonElement | null;
      if (boton) abrir(boton);
    });
  });

  escritorio.addEventListener('change', (e) => {
    if (e.matches && !botones.some((b) => b.getAttribute('aria-expanded') === 'true')) {
      abrir(botones[0]);
    }
  });

  // "Consultar por este servicio" → avisa al formulario de contacto
  document.querySelectorAll<HTMLAnchorElement>('[data-consultar-servicio]').forEach((a) => {
    a.addEventListener('click', () => {
      const id = a.dataset.consultarServicio!;
      try {
        sessionStorage.setItem('covva-servicio', id);
      } catch {
        /* almacenamiento no disponible: no pasa nada */
      }
      document.dispatchEvent(new CustomEvent(EVENTO_SERVICIO, { detail: id }));
    });
  });
}
