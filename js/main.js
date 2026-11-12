/* Jennifer França · Advogada
   Script único, sem dependências externas, sem cookies e sem coleta de dados. */
(function () {
  'use strict';

  // ===== DADOS DE CONTATO: altere somente aqui =====
  var WHATSAPP = '5511951341466'; // DDI + DDD + número, só dígitos
  var WHATSAPP_LABEL = '(11) 95134-1466';
  var MENSAGEM = 'Olá! Gostaria de agendar uma consulta.';
  // ==================================================

  var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(MENSAGEM);
  document.querySelectorAll('.js-whats').forEach(function (a) {
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });
  document.querySelectorAll('.js-whats-label').forEach(function (a) {
    a.textContent = WHATSAPP_LABEL;
  });

  // Menu no celular
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
