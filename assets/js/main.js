document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.getElementById('waitlistForm');

    // Handle waitlist form submission
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = waitlistForm.querySelector('input[type="email"]').value;
            console.log('Email submitted:', email);
            // Aquí irá la lógica del formulario
            alert('¡Gracias por unirte a la lista de espera! Te contactaremos pronto.');
        });
    }

    // Store buttons
    const storeButtons = document.querySelectorAll('.store-button');
    storeButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Las apps estarán disponibles pronto. ¡Únete a la lista de espera!');
        });
    });
});
