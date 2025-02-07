document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calcular la posición considerando el header fijo
                const headerOffset = 64; // Altura del header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
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
                // Deshabilitar el formulario mientras se procesa
                emailInput.disabled = true;
                submitButton.disabled = true;
                submitButton.style.opacity = '0.7';
                
                // Aquí irá la lógica para enviar el email al backend
                console.log('Email registrado:', email);
                
                // Mostrar mensaje de éxito
                alert('¡Gracias por unirte! Te contactaremos pronto.');
                
                // Resetear el formulario
                this.reset();
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error. Por favor intenta de nuevo.');
            } finally {
                // Re-habilitar el formulario
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
