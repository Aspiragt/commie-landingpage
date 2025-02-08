document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const ctaButtons = document.querySelectorAll('.cta-primary');
    const storeButtons = document.querySelectorAll('.store-button');

    // Manejo del formulario de waitlist
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = waitlistForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Cambiar el botón a estado de carga
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

            // Recolectar datos del formulario
            const formData = {
                name: waitlistForm.name.value,
                email: waitlistForm.email.value,
                city: waitlistForm.city.value,
                interests: waitlistForm.interests.value,
                terms: waitlistForm.terms.checked
            };

            try {
                // Aquí iría la llamada a tu API
                const response = await fetch('https://api.commie.life/waitlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Error al enviar el formulario');
                }

                // Mostrar mensaje de éxito
                waitlistForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>¡Gracias por unirte!</h3>
                        <p>Te enviaremos un email cuando estemos listos para lanzar.</p>
                    </div>
                `;

            } catch (error) {
                console.error('Error:', error);
                
                // Restaurar el botón
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Mostrar mensaje de error
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.
                `;
                
                // Insertar mensaje de error antes del botón
                submitButton.parentNode.insertBefore(errorDiv, submitButton);
                
                // Remover mensaje de error después de 5 segundos
                setTimeout(() => {
                    errorDiv.remove();
                }, 5000);
            }
        });
    }

    // Track CTA button clicks
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!button.closest('form')) {
                document.querySelector('.waitlist-form input').focus();
            }
        });
    });

    // Track store button clicks
    storeButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Las apps estarán disponibles pronto. ¡Únete a la lista de espera!');
        });
    });
});
