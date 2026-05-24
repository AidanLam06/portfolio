// navbar scroll eff
const nav = document.getElementById('mainNav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// nav link highlighting
const navLinks = document.querySelectorAll('#mainNav .nav-link[href^="#"]');
const sections = [...navLinks]
  .map(l => document.querySelector(l.getAttribute('href')))
  .filter(Boolean);

const activateLink = () => {
  const scrollY = window.scrollY + 120;
  let current = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= scrollY) current = section;
  }
  navLinks.forEach(l => {
    const active = l.getAttribute('href') === `#${current.id}`;
    l.style.color = active ? 'var(--text-1)' : '';
    l.style.background = active ? 'var(--border-subtle)' : '';
  });
};

window.addEventListener('scroll', activateLink, { passive: true });

// scroll-in animation intersection observer
const animatedEls = document.querySelectorAll('[data-animate]');
if (animatedEls.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger siblings inside the same parent
          const siblings = [...entry.target.parentElement.querySelectorAll('[data-animate]')];
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 80}ms`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animatedEls.forEach(el => observer.observe(el));
}

// smooth close mobile menu on nav link click
const navbarCollapse = document.getElementById('navbarNav');
if (navbarCollapse) {
  navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
}
