const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const sections = [...document.querySelectorAll('main section[id]')];
const setActiveLink = () => {
  const current = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 120 && rect.bottom >= 120;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', current && link.getAttribute('href') === `#${current.id}`);
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', setActiveLink);
