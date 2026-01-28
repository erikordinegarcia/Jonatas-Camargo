(function () {
  // Year in footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu toggle
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuBtn && mobileMenu) {
    const setOpen = (open) => {
      mobileMenu.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', () => {
      setOpen(!mobileMenu.classList.contains('is-open'));
    });

    // close on link click
    mobileMenu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) setOpen(false);
    });

    // close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Reveal on scroll (IntersectionObserver)
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Lightbox
  const lbRoot = document.querySelector('[data-lightbox-root]');
  const lbImg = document.querySelector('[data-lightbox-img]');
  const lbCaption = document.querySelector('[data-lightbox-caption]');
  const lbClose = document.querySelector('[data-lightbox-close]');

  const openLightbox = ({ src, alt }) => {
    if (!lbRoot || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    if (lbCaption) lbCaption.textContent = alt || '';
    lbRoot.classList.add('is-open');
    lbRoot.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lbRoot) return;
    lbRoot.classList.remove('is-open');
    lbRoot.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbImg) lbImg.src = '';
  };

  document.querySelectorAll('[data-lightbox]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const alt = btn.getAttribute('data-alt') || 'Imagem ampliada';
      if (src) openLightbox({ src, alt });
    });
  });

  if (lbRoot) {
    lbRoot.addEventListener('click', (e) => {
      const clickedImg = e.target.closest('[data-lightbox-img]');
      const clickedClose = e.target.closest('[data-lightbox-close]');
      if (clickedClose) return closeLightbox();
      // clicar fora da imagem fecha
      if (!clickedImg) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // Header shadow on scroll
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => {
      const scrolled = window.scrollY > 6;
      header.style.boxShadow = scrolled ? '0 18px 40px rgba(0,0,0,.22)' : 'none';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
