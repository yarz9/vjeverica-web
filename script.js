// ===== Sticky Header =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== Mobile Navigation =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav-link, .mobile-nav .btn').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== Menu Tabs =====
const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;

        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        menuItems.forEach(item => {
            if (item.dataset.category === category) {
                item.style.display = 'flex';
                item.style.animation = 'fadeUp 0.3s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    threshold: 0.3,
    rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--header-h')} 0px 0px 0px`
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ===== Scroll Fade-in Animation =====
const fadeElements = document.querySelectorAll(
    '.about-grid, .menu-categories, .menu-grid, .featured-card, .gallery-grid, .review-card, .contact-grid, .section-header'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

fadeElements.forEach(el => fadeObserver.observe(el));
