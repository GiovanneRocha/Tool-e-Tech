// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
            
    // --- Script do Menu Mobile ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuToggle.querySelector('i');

    if (menuToggle) { // Garante que o botão exista
        menuToggle.addEventListener('click', () => {
            const isActive = mobileMenu.classList.toggle('active');
            if (isActive) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    }

    // --- Script do Carrossel Hero ---
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
    
    // --- Script do Carrossel de Logos ---
    const logoSwiper = new Swiper('.logo-swiper', {
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        slidesPerView: 2,
        spaceBetween: 20,
        breakpoints: {
            640: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
        }
    });

    // --- NOVO: Script do "Estilo Gaveta" (Accordion) ---
    const drawerTriggers = document.querySelectorAll('.drawer-trigger');

    drawerTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (!targetContent) return; // Se não achar o conteúdo, para

            // Fecha todos os outros abertos
            drawerTriggers.forEach(t => {
                if (t !== trigger) {
                    t.classList.remove('active');
                    const otherTargetId = t.getAttribute('data-target');
                    const otherTargetContent = document.getElementById(otherTargetId);
                    if (otherTargetContent) {
                         otherTargetContent.classList.remove('active');
                    }
                }
            });

            // Abre ou fecha o clicado
            trigger.classList.toggle('active');
            targetContent.classList.toggle('active');
        });
    });
    
});