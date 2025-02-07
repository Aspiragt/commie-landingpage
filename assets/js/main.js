document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calcular la posición considerando el header fijo
                const headerOffset = 80; // Altura del header + padding
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
            
            const email = emailInput.value;
            
            try {
                // Deshabilitar el formulario mientras se procesa
                emailInput.disabled = true;
                submitButton.disabled = true;
                
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
            }
        });
    }

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.closest('form')) {
                document.querySelector('.waitlist-form input').focus();
            }
        });
    });

    // Track store button clicks
    const storeButtons = document.querySelectorAll('.store-button');
    storeButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Las apps estarán disponibles pronto. ¡Únete a la lista de espera!');
        });
    });
});
