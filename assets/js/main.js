document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const ctaButtons = document.querySelectorAll('.cta-primary');
    const storeButtons = document.querySelectorAll('.store-button');
    const headerJoinBtn = document.getElementById('headerJoinBtn');
    const joinWaitlist = document.getElementById('joinWaitlist');

    // Scroll suave al formulario
    if (headerJoinBtn && joinWaitlist) {
        headerJoinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            joinWaitlist.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        });
    }

    // Handle waitlist form submission
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        try {
            // Here you would typically send this to your backend
            console.log('Email submitted:', email);
            
            // Show success message
            alert('¡Gracias por unirte! Te contactaremos pronto.');
            e.target.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error. Por favor intenta de nuevo.');
        }
    });

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
