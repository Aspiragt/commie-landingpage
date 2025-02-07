document.addEventListener('DOMContentLoaded', function() {
    // Prevenir scroll automático al recargar
    if (window.location.hash) {
        window.scrollTo(0, 0);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1);
    }

    // Detectar y ajustar la URL base
    const baseUrl = window.location.origin;
    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('/')) {
            link.href = `${baseUrl}${href}`;
        }
    });

    // Ajustar rutas de assets
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"][href^="/"]');
    const images = document.querySelectorAll('img[src^="/"]');
    
    cssLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('/')) {
            link.href = `${baseUrl}${href}`;
        }
    });
    
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src.startsWith('/')) {
            img.src = `${baseUrl}${src}`;
        }
    });

    // Scroll suave solo para clicks, no para recargas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 64;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Actualizar URL sin causar scroll
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });

    // Manejar el formulario de waitlist
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            if (!emailInput || !submitButton) return;
            
            const email = emailInput.value.trim();
            if (!email) {
                alert('Por favor ingresa tu email');
                return;
            }
            
            try {
                emailInput.disabled = true;
                submitButton.disabled = true;
                submitButton.style.opacity = '0.7';
                
                console.log('Email registrado:', email);
                alert('¡Gracias por unirte! Te contactaremos pronto.');
                this.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error. Por favor intenta de nuevo.');
            } finally {
                emailInput.disabled = false;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }
        });
    }

    // Track CTA button clicks
    document.querySelectorAll('.cta-primary').forEach(button => {
        if (!button.closest('form')) {
            button.addEventListener('click', () => {
                console.log('CTA clicked');
            });
        }
    });

    // Track store button clicks
    document.querySelectorAll('.store-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Las apps estarán disponibles pronto. ¡Únete a la lista de espera!');
        });
    });
});
