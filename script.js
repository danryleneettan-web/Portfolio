// Mobile navigation and theme switching keep the page useful on every screen.
document.addEventListener('DOMContentLoaded', () => {
  // Toggle the mobile menu and keep its accessibility state in sync.
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      navLinks.classList.toggle('is-open', !isOpen);
    });

    // Close the menu after a visitor chooses a section.
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // Switch the color theme and remember the visitor's preference.
  const themeButton = document.querySelector('.theme-toggle');
  const themeLabel = document.querySelector('.theme-label');
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }

  const updateThemeButton = () => {
    const isDark = document.body.classList.contains('dark-theme');
    themeButton?.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    if (themeLabel) themeLabel.textContent = isDark ? 'Light' : 'Theme';
  };

  updateThemeButton();
  themeButton?.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('portfolio-theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    updateThemeButton();
  });

  // Keep the footer year current without requiring an annual edit.
  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
});
