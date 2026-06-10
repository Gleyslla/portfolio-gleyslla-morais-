document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const links = document.querySelectorAll('.nav-menu a');
  const scrollTop = document.querySelector('.scroll-top');
  const header = document.querySelector('.header');

  toggle.addEventListener('click', () => {
    const opened = menu.classList.toggle('active');
    toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sections = document.querySelectorAll('section[id]');
  function activeMenu() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.getAttribute('id');
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });

    scrollTop.classList.toggle('show', scrollY > 380);
    header.classList.toggle('scrolled', scrollY > 40);
  }

  window.addEventListener('scroll', activeMenu);
  activeMenu();

  scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
