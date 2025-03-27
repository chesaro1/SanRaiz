// Enhanced Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.getElementById('navbar');

// Toggle menu
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    navbar.classList.toggle('menu-open');
    document.body.classList.toggle('no-scroll');
});

// Close menu on click outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
});

function closeMobileMenu() {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    navbar.classList.remove('menu-open');
    document.body.classList.remove('no-scroll');
}