// Mobile navigation
const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
});

navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
});

// Keep the copyright year current.
document.querySelector('#current-year').textContent = new Date().getFullYear();
