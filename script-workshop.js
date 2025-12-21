// Workshop presentation JS (separate from your main site)

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (toggle && mobileNav) {
    const setOpen = (open) => {
      mobileNav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
    };

    toggle.addEventListener('click', () => {
      const open = !mobileNav.classList.contains('is-open');
      setOpen(open);
    });

    mobileNav.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Smooth scroll offset (sticky header)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const header = document.getElementById('siteHeader');
      const headerOffset = header ? header.getBoundingClientRect().height + 12 : 84;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    });
  });

  // Footer year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple appear-on-scroll animations
  const items = Array.from(document.querySelectorAll('[data-animate]'));
  if (items.length === 0) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
  );

  items.forEach((el) => io.observe(el));
});
