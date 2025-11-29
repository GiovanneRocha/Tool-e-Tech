// form-handler.js - Gerencia feedback de formulário e animações

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validação simples
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#EF4444';
                } else {
                    field.style.borderColor = '';
                }
            });

            if (!isValid) {
                showFeedback('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            // Simular envio (em produção, fazer POST para backend)
            const formData = new FormData(contactForm);
            console.log('Dados do formulário:', Object.fromEntries(formData));

            // Mostrar sucesso
            showFeedback(
                '✓ Mensagem enviada com sucesso! Em breve entraremos em contato.',
                'success'
            );

            // Limpar formulário
            setTimeout(() => {
                contactForm.reset();
                formFeedback.classList.remove('show');
            }, 3000);
        });

        // Limpar erro ao começar a digitar
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '';
            });
        });
    }

    /**
     * Exibe mensagem de feedback no formulário
     * @param {string} message - Mensagem a exibir
     * @param {string} type - Tipo: 'success' ou 'error'
     */
    function showFeedback(message, type) {
        if (!formFeedback) return;

        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type} show`;

        // Auto-remover após 5 segundos
        setTimeout(() => {
            formFeedback.classList.remove('show');
        }, 5000);
    }
});

// Adicionar animação de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar feedback visual em inputs ao focar
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--cor-primaria)';
    });

    input.addEventListener('blur', function() {
        if (!this.value.trim()) {
            this.style.borderColor = '';
        }
    });
});
