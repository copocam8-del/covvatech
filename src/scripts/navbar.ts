/**
 * Navbar: efecto al hacer scroll, menú móvil accesible y resaltado
 * del enlace de la sección visible.
 */
export function iniciarNavbar() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const etiqueta = document.querySelector<HTMLElement>('[data-menu-etiqueta]');
  if (!nav || !toggle || !menu) return;

  /* ---------- Efecto al hacer scroll ---------- */
  const actualizarScroll = () => nav.classList.toggle('es-scroll', window.scrollY > 12);
  actualizarScroll();
  window.addEventListener('scroll', actualizarScroll, { passive: true });

  /* ---------- Menú móvil ---------- */
  const escritorio = window.matchMedia('(min-width: 960px)');

  const abrir = () => {
    nav.setAttribute('data-abierto', '');
    toggle.setAttribute('aria-expanded', 'true');
    if (etiqueta) etiqueta.textContent = 'Cerrar menú';
    document.body.classList.add('menu-abierto');
  };

  const cerrar = ({ devolverFoco = false } = {}) => {
    if (!nav.hasAttribute('data-abierto')) return;
    nav.removeAttribute('data-abierto');
    toggle.setAttribute('aria-expanded', 'false');
    if (etiqueta) etiqueta.textContent = 'Abrir menú';
    document.body.classList.remove('menu-abierto');
    if (devolverFoco) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    nav.hasAttribute('data-abierto') ? cerrar() : abrir();
  });

  // Al elegir un enlace, se cierra el menú
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) cerrar();
  });

  document.addEventListener('keydown', (e) => {
    if (!nav.hasAttribute('data-abierto')) return;

    if (e.key === 'Escape') {
      cerrar({ devolverFoco: true });
      return;
    }

    // Mantener el foco dentro del menú abierto (botón + enlaces)
    if (e.key === 'Tab') {
      const enfocables = [toggle, ...menu.querySelectorAll<HTMLElement>('a[href]')];
      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    }
  });

  // Si se agranda la ventana a escritorio, se cierra el menú móvil
  escritorio.addEventListener('change', (e) => {
    if (e.matches) cerrar();
  });

  /* ---------- Enlace activo según la sección visible ---------- */
  const enlaces = new Map<string, HTMLElement>();
  document.querySelectorAll<HTMLElement>('[data-nav-link]').forEach((a) => {
    enlaces.set(a.dataset.navLink!, a);
  });

  const marcar = (id: string) => {
    enlaces.forEach((a, clave) => {
      if (clave === id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  };

  // Una sección cuenta como "visible" cuando cruza una franja horizontal
  // ubicada a ~35 % del alto de la pantalla.
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) marcar(entrada.target.id);
      });
    },
    { rootMargin: '-35% 0px -60% 0px' },
  );

  // Se observan todas las secciones: si la visible no está en el menú
  // (por ejemplo, "Cómo trabajamos"), no queda ningún enlace marcado.
  document.querySelectorAll<HTMLElement>('main section[id]').forEach((s) => observador.observe(s));
}
