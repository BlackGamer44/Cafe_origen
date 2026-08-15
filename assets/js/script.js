/* =========================================================
   CAFÉ ORIGEN — script principal
   Modo oscuro + selector de idioma (ES/EN) persistentes,
   filtro de categorías del menú, lightbox simple de galería,
   botón "volver arriba" y validación ligera del formulario.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Modo oscuro ---------- */
  var root = document.documentElement;
  var btnTema = document.getElementById('btnTema');

  function temaGuardado() {
    return localStorage.getItem('co-theme');
  }
  if (!temaGuardado() && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }
  if (btnTema) {
    btnTema.addEventListener('click', function () {
      var esOscuro = root.getAttribute('data-theme') === 'dark';
      if (esOscuro) {
        root.removeAttribute('data-theme');
        localStorage.setItem('co-theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('co-theme', 'dark');
      }
    });
  }

  /* ---------- Idioma ES / EN ---------- */
  var btnIdioma = document.getElementById('btnIdioma');
  if (btnIdioma) {
    btnIdioma.addEventListener('click', function () {
      var actual = root.getAttribute('data-lang') || 'es';
      var nuevo = actual === 'es' ? 'en' : 'es';
      root.setAttribute('data-lang', nuevo);
      root.setAttribute('lang', nuevo);
      localStorage.setItem('co-lang', nuevo);
    });
  }

  /* ---------- Filtro de categorías del menú ---------- */
  var filtros = document.querySelectorAll('.menu-filter-btn');
  var productos = document.querySelectorAll('[data-categoria]');
  filtros.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filtros.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var cat = btn.getAttribute('data-filtro');
      productos.forEach(function (card) {
        var mostrar = cat === 'todos' || card.getAttribute('data-categoria') === cat;
        card.closest('.producto-col').style.display = mostrar ? '' : 'none';
      });
    });
  });


  /* ---------- Botón volver arriba ---------- */
  var btnArriba = document.getElementById('btnArriba');
  if (btnArriba) {
    window.addEventListener('scroll', function () {
      btnArriba.classList.toggle('is-visible', window.scrollY > 500);
    });
    btnArriba.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Formulario de contacto (estático: mailto) ---------- */
  var formContacto = document.getElementById('formContacto');
  if (formContacto) {
    formContacto.addEventListener('submit', function (e) {
      e.preventDefault();

      var alertaExito = document.getElementById('alertaExito');
      var alertaError = document.getElementById('alertaError');
      var honeypot = document.getElementById('sitio_web');

      function mostrarExito() {
        if (alertaError) alertaError.hidden = true;
        if (alertaExito) alertaExito.hidden = false;
        formContacto.reset();
        if (alertaExito) alertaExito.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (honeypot && honeypot.value.trim()) {
        mostrarExito();
        return;
      }

      var campos = formContacto.querySelectorAll('[required]');
      var valido = true;
      campos.forEach(function (campo) {
        if (!campo.value.trim()) {
          valido = false;
          campo.classList.add('is-invalid');
        } else {
          campo.classList.remove('is-invalid');
        }
      });

      var email = document.getElementById('email');
      if (email && email.value.trim()) {
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        if (!emailOk) {
          valido = false;
          email.classList.add('is-invalid');
        }
      }

      if (!valido) {
        if (alertaExito) alertaExito.hidden = true;
        if (alertaError) alertaError.hidden = false;
        return;
      }

      var nombre = document.getElementById('nombre').value.trim();
      var asuntoEl = document.getElementById('asunto');
      var asunto = (asuntoEl && asuntoEl.value.trim()) || 'Contacto desde el sitio web';
      var mensaje = document.getElementById('mensaje').value.trim();
      var cuerpo = 'Nombre: ' + nombre + '\nEmail: ' + email.value.trim() + '\n\n' + mensaje;
      window.location.href = 'mailto:hola@cafeorigen.com?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
      mostrarExito();
    });
  }

  /* ---------- Año actual ---------- */
  var anios = document.querySelectorAll('.js-anio-actual');
  anios.forEach(function (el) { el.textContent = new Date().getFullYear(); });

});
