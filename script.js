(function() {
    'use strict';

    // ---------- Theme Toggle ----------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
        updateIcon(next);
    });

    function updateIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // ---------- Mobile Menu ----------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // ---------- Active Nav Link on Scroll ----------
    const sections = document.querySelectorAll('section');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ---------- Typing Effect ----------
    const typedTextEl = document.getElementById('typedText');
    const phrases = [
        'Full-Stack Developer',
        'UI/UX Enthusiast',
        'Open Source Contributor',
        'Problem Solver',
        'Creative Thinker'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 300; // pause before typing next
        }
        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    // ---------- Skill Bars Animation (Intersection Observer) ----------
    const skillFills = document.querySelectorAll('.skill-bar .fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
            }
        });
    }, { threshold: 0.4 });

    skillFills.forEach(fill => skillObserver.observe(fill));

    // ---------- Fade-in Animation (Intersection Observer) ----------
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ---------- Contact Form ----------
    const contactForm = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        try {
            const res = await fetch('https://formspree.io/f/mljgkvpa', {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                status.textContent = 'Message sent — I\'ll get back to you soon.';
                this.reset();
            } else {
                status.textContent = 'Something went wrong. Please try again or email me directly.';
            }
        } catch (err) {
            status.textContent = 'Network error. Please try again or email me directly.';
        }
        status.classList.add('show');
        setTimeout(() => status.classList.remove('show'), 6000);
    });

})();