/**
 * Garlic Export — Redesigned Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Preloader
    // ==========================================
    const preloader = document.getElementById('preloader');
    const progress = preloader.querySelector('.preloader-progress');
    let prog = 0;
    const loadInterval = setInterval(() => {
        prog += Math.random() * 30;
        if (prog > 100) prog = 100;
        progress.style.width = prog + '%';
        if (prog >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => preloader.classList.add('done'), 400);
        }
    }, 200);

    // ==========================================
    // Navbar scroll
    // ==========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    });

    // ==========================================
    // Mobile menu
    // ==========================================
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const spans = menuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            const spans = menuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ==========================================
    // Scroll animations
    // ==========================================
    const animElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animElements.forEach(el => observer.observe(el));

    // ==========================================
    // Counter animation
    // ==========================================
    const counters = document.querySelectorAll('[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    el.textContent = current.toLocaleString();
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));

    // ==========================================
    // Smooth scroll
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ==========================================
    // Active nav highlight
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.pageYOffset >= s.offsetTop - 200) {
                current = s.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    });

    // ==========================================
    // Contact form
    // ==========================================
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.innerHTML;
            btn.innerHTML = '发送中...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('✅ 询价已收到！我们将在 24 小时内回复您');
                form.reset();
                btn.innerHTML = orig;
                btn.disabled = false;
            }, 1200);
        });
    }

    // ==========================================
    // Toast
    // ==========================================
    function showToast(msg) {
        const existing = document.querySelector('.toast-msg');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.textContent = msg;
        Object.assign(toast.style, {
            position: 'fixed', bottom: '2rem', right: '2rem', zIndex: '99999',
            background: '#2D5016', color: '#fff', padding: '1rem 2rem',
            borderRadius: '10px', fontWeight: '600', fontSize: '0.9rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            animation: 'fadeInUp 0.4s ease-out',
        });
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0'; toast.style.transform = 'translateY(20px)';
            toast.style.transition = 'all 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
});
