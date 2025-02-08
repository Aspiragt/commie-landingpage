document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const ctaButtons = document.querySelectorAll('.cta-primary');
    const storeButtons = document.querySelectorAll('.store-button');

    // Handle waitlist form submission
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to your backend
        console.log('Email submitted:', email);
        
        // Show success message
        alert('¡Gracias por unirte! Te contactaremos pronto.');
        e.target.reset();
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
