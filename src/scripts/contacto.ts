/**
 * Formulario de contacto: validación con mensajes claros y envío real a Formspree.
 * No simula envíos: si el endpoint no está configurado, lo avisa y no envía nada.
 */
import { EVENTO_SERVICIO } from './servicios';

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const MENSAJES: Record<string, (c: Control) => string | null> = {
  nombre: (c) => {
    const v = c.value.trim();
    if (!v) return 'Ingresá tu nombre.';
    if (v.length < 2) return 'El nombre parece incompleto.';
    return null;
  },
  email: (c) => {
    const v = c.value.trim();
    if (!v) return 'Ingresá tu correo electrónico.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
      return 'Revisá el correo: debería tener un formato como nombre@dominio.com.';
    return null;
  },
  servicio: (c) => (c.value ? null : 'Elegí el tipo de servicio (o "Todavía no lo sé").'),
  mensaje: (c) => {
    const v = c.value.trim();
    if (!v) return 'Contanos brevemente qué necesitás.';
    if (v.length < 20) return `Contanos un poco más: faltan ${20 - v.length} caracteres como mínimo.`;
    return null;
  },
};

export function iniciarContacto() {
  const form = document.querySelector<HTMLFormElement>('[data-form-contacto]');
  if (!form) return;

  const tarjeta = form.parentElement!;
  const exito = tarjeta.querySelector<HTMLElement>('[data-estado-exito]')!;
  const errorGeneral = form.querySelector<HTMLElement>('[data-estado-error]')!;
  const errorGeneralTexto = form.querySelector<HTMLElement>('[data-estado-error-texto]')!;
  const boton = form.querySelector<HTMLButtonElement>('[data-enviar]')!;
  const botonTexto = form.querySelector<HTMLElement>('[data-enviar-texto]')!;
  const contador = form.querySelector<HTMLElement>('[data-contador]');
  const mensaje = form.querySelector<HTMLTextAreaElement>('#f-mensaje')!;
  const servicio = form.querySelector<HTMLSelectElement>('#f-servicio')!;
  const listo = form.dataset.listo === 'true';

  const controles = Object.keys(MENSAJES)
    .map((nombre) => form.elements.namedItem(nombre) as Control | null)
    .filter((c): c is Control => Boolean(c));

  /* ---------- Validación por campo ---------- */
  const errorDe = (c: Control) => document.getElementById(`${c.id}-error`)!;
  const tocados = new Set<Control>();

  const validar = (c: Control) => {
    const texto = MENSAJES[c.name]?.(c) ?? null;
    const el = errorDe(c);
    if (texto) {
      c.setAttribute('aria-invalid', 'true');
      el.textContent = texto;
      el.hidden = false;
    } else {
      c.removeAttribute('aria-invalid');
      el.textContent = '';
      el.hidden = true;
    }
    return !texto;
  };

  controles.forEach((c) => {
    // Se valida al salir del campo; después, mientras se corrige, en cada cambio.
    c.addEventListener('blur', () => {
      if (c.value.trim()) tocados.add(c);
      if (tocados.has(c)) validar(c);
    });
    c.addEventListener('input', () => {
      if (tocados.has(c)) validar(c);
    });
    c.addEventListener('change', () => {
      tocados.add(c);
      validar(c);
    });
  });

  /* ---------- Contador de caracteres ---------- */
  const actualizarContador = () => {
    if (contador) contador.textContent = `${mensaje.value.length} / ${mensaje.maxLength}`;
  };
  mensaje.addEventListener('input', actualizarContador);
  actualizarContador();

  /* ---------- Preselección desde "Consultar por este servicio" ---------- */
  const preseleccionar = (id: string | null) => {
    if (!id) return;
    const opcion = [...servicio.options].find((o) => o.dataset.id === id);
    if (opcion) {
      servicio.value = opcion.value;
      tocados.add(servicio);
      validar(servicio);
    }
  };
  document.addEventListener(EVENTO_SERVICIO, (e) => preseleccionar((e as CustomEvent<string>).detail));
  try {
    preseleccionar(sessionStorage.getItem('covva-servicio'));
  } catch {
    /* sin almacenamiento disponible */
  }

  /* ---------- Estados ---------- */
  const mostrarError = (texto: string) => {
    errorGeneralTexto.textContent = texto;
    errorGeneral.hidden = false;
  };

  const ocupado = (si: boolean) => {
    boton.disabled = si;
    boton.setAttribute('aria-busy', String(si));
    botonTexto.textContent = si ? 'Enviando…' : 'Enviar consulta';
  };

  /* ---------- Envío ---------- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorGeneral.hidden = true;

    controles.forEach((c) => tocados.add(c));
    const invalidos = controles.filter((c) => !validar(c));
    if (invalidos.length) {
      invalidos[0].focus();
      return;
    }

    if (!listo) {
      mostrarError(
        'El formulario todavía no está conectado, así que tu mensaje no se envió. Por ahora, escribinos por alguno de los canales de contacto.',
      );
      return;
    }

    ocupado(true);
    try {
      const respuesta = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!respuesta.ok) throw new Error(String(respuesta.status));

      form.reset();
      actualizarContador();
      tocados.clear();
      try {
        sessionStorage.removeItem('covva-servicio');
      } catch {
        /* nada */
      }
      form.hidden = true;
      exito.hidden = false;
      exito.focus();
    } catch {
      mostrarError(
        'No pudimos enviar tu consulta. Revisá tu conexión e intentá de nuevo, o escribinos por WhatsApp, Instagram o correo.',
      );
    } finally {
      ocupado(false);
    }
  });

  /* ---------- Enviar otra consulta ---------- */
  tarjeta.querySelector('[data-otra-consulta]')?.addEventListener('click', () => {
    exito.hidden = true;
    form.hidden = false;
    (form.elements.namedItem('nombre') as HTMLInputElement).focus();
  });
}
