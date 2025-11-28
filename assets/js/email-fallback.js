/**
 * Email Fallback Handler
 * Tenta abrir o Outlook Web deeplink e redireciona para mailto: se falhar
 */

document.addEventListener('DOMContentLoaded', () => {
    const outlookFab = document.querySelector('.outlook-fab');
    
    if (!outlookFab) return;
    
    const outlookUrl = outlookFab.getAttribute('href');
    const emailMatch = outlookUrl.match(/to=([^&]+)/);
    const email = emailMatch ? decodeURIComponent(emailMatch[1]) : 'tooltech.solutions@outlook.com';
    
    outlookFab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Tenta abrir Outlook Web
        const outlookWindow = window.open(outlookUrl, '_blank');
        
        // Se a janela não abrir ou Outlook Web não responder em 1.5s, usa mailto:
        const timeoutId = setTimeout(() => {
            if (!outlookWindow || outlookWindow.closed === undefined) {
                // Outlook Web não estava disponível, usar mailto
                const mailtoUrl = `mailto:${email}?subject=Contato%20via%20Tool%26Tech&body=Ol%C3%A1%20equipe%20Tool%26Tech,%0D%0A%0D%0AEntro%20em%20contato%20para%20saber%20mais%20sobre%20seus%20servi%C3%A7os.%0D%0A%0D%0AAt%C3%A9%20logo!`;
                window.location.href = mailtoUrl;
            } else {
                // Outlook Web abriu com sucesso
                outlookWindow.focus();
            }
        }, 1500);
        
        // Se a janela abrir e responder rápido, limpa o timeout
        if (outlookWindow) {
            outlookWindow.addEventListener('load', () => {
                clearTimeout(timeoutId);
            });
            
            // Se a janela fechar rapidamente, tenta mailto
            const checkInterval = setInterval(() => {
                if (outlookWindow.closed) {
                    clearInterval(checkInterval);
                    clearTimeout(timeoutId);
                }
            }, 500);
        }
    });
});
