/**
 * Hace aparecer suavemente los elementos con [data-revelar] cuando entran en pantalla.
 * Los elementos hermanos que aparecen juntos se escalonan levemente.
 */
export function iniciarRevelar() {
  const elementos = document.querySelectorAll<HTMLElement>('[data-revelar]');
  // Sin soporte, no se oculta nada: el contenido queda visible tal cual.
  if (!('IntersectionObserver' in window)) return;

  // Recién ahora se habilita el ocultamiento inicial (ver base.css). Si este script
  // no llegara a cargar, el contenido se sigue viendo normalmente.
  document.documentElement.classList.add('revelar-activo');

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas
        .filter((e) => e.isIntersecting)
        .forEach((entrada, i) => {
          const el = entrada.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
          el.classList.add('revelado');
          observador.unobserve(el);
        });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  elementos.forEach((el) => observador.observe(el));
}
