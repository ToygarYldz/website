// ===== PARTICLES BACKGROUND =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const colors = ['rgba(108, 99, 255, 0.4)', 'rgba(0, 212, 170, 0.3)', 'rgba(255, 107, 157, 0.3)'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 15;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 3}px ${color};
        `;
        
        container.appendChild(particle);
    }
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    
    window.addEventListener('scroll', () => {
        // Scrolled state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link based on section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== MOBILE NAV TOGGLE =====
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    
    if (!toggle || !links) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });
    
    // Close menu on link click
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('active');
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                let current = 0;
                const step = Math.max(1, target / 40);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current);
                }, 40);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== SKILL BAR ANIMATION =====
function animateSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    bars.forEach(bar => observer.observe(bar));
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const elements = document.querySelectorAll('.about-card, .skill-card, .gallery-item, .contact-card, .section-header');
    elements.forEach(el => el.classList.add('reveal'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// ===== LIGHTBOX =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!lightbox) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

// ===== TILT EFFECT ON CARDS =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initNavbar();
    initMobileNav();
    initSmoothScroll();
    animateCounters();
    animateSkillBars();
    initScrollReveal();
    initLightbox();
    initTiltEffect();
});
