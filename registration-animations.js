document.addEventListener('DOMContentLoaded', () => {
  const regHamburger = document.getElementById('reg-hamburger');
  const regNavLinks = document.getElementById('reg-nav-links');
  const regOverlay = document.getElementById('reg-nav-overlay');

  if (regHamburger && regNavLinks) {
    regHamburger.addEventListener('click', () => {
      const isOpen = regHamburger.getAttribute('aria-expanded') === 'true';
      regHamburger.setAttribute('aria-expanded', String(!isOpen));
      regHamburger.classList.toggle('open');
      regNavLinks.classList.toggle('open');

      if (regOverlay) {
        regOverlay.classList.toggle('visible', !isOpen);
      }
    });

    regNavLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        regNavLinks.classList.remove('open');
        regHamburger.classList.remove('open');
        regHamburger.setAttribute('aria-expanded', 'false');
        if (regOverlay) regOverlay.classList.remove('visible');
      });
    });

    if (regOverlay) {
      regOverlay.addEventListener('click', () => {
        regNavLinks.classList.remove('open');
        regHamburger.classList.remove('open');
        regHamburger.setAttribute('aria-expanded', 'false');
        regOverlay.classList.remove('visible');
      });
    }
  }

  const fabTop = document.getElementById('fab-top');
  if (fabTop) {
    const toggleVisibility = () => {
      if (window.scrollY > 260) {
        fabTop.classList.add('visible');
      } else {
        fabTop.classList.remove('visible');
      }
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
  }
});
