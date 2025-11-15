// assets/js/animations.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Inicializar AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,       // Duração da animação
        easing: 'ease-in-out', // Curva da animação
        once: true,          // Animar apenas uma vez
        offset: 100,         // Começa a animar 100px antes de aparecer
    });


    // --- 2. Animação do Contador de Números ---
    
    // Função para animar um número de 0 até o 'goal'
    function animateCounter(element, goal) {
        let current = 0;
        const speed = 200; // Define a "velocidade" da contagem (quanto menor, mais rápido)
        const increment = goal / speed;

        const updateCount = () => {
            current += increment;
            
            if (current < goal) {
                element.innerText = '+' + Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                element.innerText = '+' + goal;
            }
        };
        updateCount();
    }

    // O "Observador" que fica "olhando" a seção de métricas
    const metricsSection = document.getElementById('metrics-counter');
    let animationStarted = false; // Flag para garantir que anime só uma vez

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animationStarted) {
                
                const counters = metricsSection.querySelectorAll('h3[data-goal]');
                
                counters.forEach(counter => {
                    const goal = parseInt(counter.getAttribute('data-goal'), 10);
                    
                    if (!isNaN(goal)) {
                        animateCounter(counter, goal);
                    }
                });

                animationStarted = true;
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.5 // Inicia quando 50% da seção estiver visível
    });

    if (metricsSection) {
        observer.observe(metricsSection);
    }

});