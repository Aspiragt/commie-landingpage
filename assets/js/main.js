document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    const ctaButtons = document.querySelectorAll('.cta-primary');
    const storeButtons = document.querySelectorAll('.store-button');

    // Scroll suave a elementos
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const headerOffset = 60;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

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

    // Botones de registro
    const scrollButtons = document.querySelectorAll('[data-scroll-to]');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-scroll-to');
            scrollToElement(target);
        });
    });
});
