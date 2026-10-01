document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const independenceFeature = document.getElementById('independence-feature');
  if (independenceFeature) {
    const parts = new Intl.DateTimeFormat('en', {
      timeZone: 'Africa/Lagos',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date());
    const nigeriaDate = Object.fromEntries(
      parts.filter(({ type }) => type !== 'literal').map(({ type, value }) => [type, value])
    );

    if (nigeriaDate.month === '10' && nigeriaDate.day === '01') {
      const anniversary = document.getElementById('independence-anniversary');
      if (anniversary) anniversary.textContent = String(Number(nigeriaDate.year) - 1960);
      independenceFeature.hidden = false;
    }
  }

  const codePanel = document.querySelector('.panel-body');
  const codeLines = codePanel
    ? [...codePanel.querySelectorAll(':scope > div:not(.panel-verse)')]
    : [];

  if (codeLines.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const textSegments = codeLines.map((line) => {
      const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
      const segments = [];

      while (walker.nextNode()) {
        const textNode = walker.currentNode;
        if (textNode.parentElement?.closest('.ln')) continue;
        segments.push({ node: textNode, text: textNode.textContent });
        textNode.textContent = '';
      }

      return segments;
    });

    const typeLine = (lineIndex) => {
      if (lineIndex >= textSegments.length) {
        codePanel.classList.add('typing-complete');
        return;
      }

      const segments = textSegments[lineIndex];
      let segmentIndex = 0;
      let characterIndex = 0;

      const typeNextCharacter = () => {
        while (
          segmentIndex < segments.length &&
          characterIndex >= segments[segmentIndex].text.length
        ) {
          segmentIndex += 1;
          characterIndex = 0;
        }

        if (segmentIndex >= segments.length) {
          window.setTimeout(() => typeLine(lineIndex + 1), 110);
          return;
        }

        const segment = segments[segmentIndex];
        segment.node.textContent += segment.text.charAt(characterIndex);
        characterIndex += 1;
        window.setTimeout(typeNextCharacter, 18);
      };

      typeNextCharacter();
    };

    typeLine(0);
  }

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  const closeMobileMenu = () => {
    if (!navLinks || !hamburger) return;
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    if (navOverlay) {
      navOverlay.classList.remove('open');
      navOverlay.setAttribute('aria-hidden', 'true');
    }
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      hamburger.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');

      if (navOverlay) {
        navOverlay.classList.toggle('open');
        navOverlay.setAttribute('aria-hidden', String(expanded));
      }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMobileMenu);
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
