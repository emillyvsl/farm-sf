// script.js - JavaScript para funcionalidades do site

document.addEventListener('DOMContentLoaded', function () {
    // Seletores de idioma
    const langButtons = document.querySelectorAll('.lang-btn');
    const langElements = document.querySelectorAll('[data-pt], [data-en]');

    // Menu mobile
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Contador de estatísticas
    const statNumbers = document.querySelectorAll('.stat-number');

    // Formulário de contato
    const contactForm = document.getElementById('contactForm');

    // Inicialização
    initLanguage();
    initMobileMenu();
    initScrollAnimations();
    initContactForm();

    // Função para inicializar o sistema de idiomas
    function initLanguage() {
        langButtons.forEach(button => {
            button.addEventListener('click', function () {
                const lang = this.id === 'lang-pt' ? 'pt' : 'en';
                setLanguage(lang);

                // Atualizar botões ativos
                langButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Função para definir o idioma
    function setLanguage(lang) {
        langElements.forEach(element => {
            const text = lang === 'pt' ? element.getAttribute('data-pt') : element.getAttribute('data-en');
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', text);
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    // Função para inicializar o menu mobile
    function initMobileMenu() {
        if (hamburgerMenu) {
            hamburgerMenu.addEventListener('click', function () {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Fechar menu ao clicar em um link
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', function () {
                    hamburgerMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Função para inicializar animações de rolagem
    function initScrollAnimations() {
        // Observador de interseção para animações
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');

                    // Animar contadores de estatísticas
                    if (entry.target.classList.contains('stats-container')) {
                        animateStats();
                    }
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const elementsToAnimate = document.querySelectorAll('.step-item, .content-wrapper-ray-valley, .stats-container, .coffee-features');
        elementsToAnimate.forEach(el => observer.observe(el));

        // Header scroll effect
        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // Função para animar estatísticas
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Função para inicializar o formulário de contato
    function initContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();

                // Simular envio do formulário
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            });
        }

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const input = this.querySelector('input[type="email"]');
                alert('Obrigado por se inscrever em nossa newsletter!');
                input.value = '';
            });
        }
    }

    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
