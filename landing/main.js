console.log('Script cargado');

// Asegurarse de que la página empiece en la parte superior al recargar
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Scroll al formulario
    document.querySelectorAll('.nav-cta, .cta-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.waitlist').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Animación de entrada para las cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    document.querySelectorAll('.benefit, .community-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // Manejo del formulario de waitlist
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = waitlistForm.querySelector('input[type="email"]').value;
            const button = waitlistForm.querySelector('button');

            try {
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
                button.disabled = true;

                // Aquí iría la llamada a tu API
                await new Promise(resolve => setTimeout(resolve, 1000));

                button.innerHTML = '<i class="fas fa-check"></i> ¡Listo!';
                button.classList.add('success');
                
                // Mostrar mensaje de éxito
                const successMessage = document.createElement('p');
                successMessage.textContent = '¡Gracias por unirte! Te contactaremos pronto.';
                successMessage.style.color = 'var(--primary)';
                successMessage.style.marginTop = '1rem';
                waitlistForm.appendChild(successMessage);

            } catch (error) {
                button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
                console.error('Error:', error);
            }
        });
    }

    // Animación de las burbujas
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        bubble.style.animation = `float ${20 + index * 5}s infinite ease-in-out ${index * 5}s`;
    });

    // Header dinámico
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        if (currentScroll > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Añadir efecto de hover a las community cards
    document.querySelectorAll('.community-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Track CTA button clicks
    document.querySelectorAll('.cta-primary').forEach(button => {
        button.addEventListener('click', () => {
            if (!button.closest('form')) {
                document.querySelector('.waitlist-form input').focus();
            }
        });
    });

    // Track store button clicks
    document.querySelectorAll('.store-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Las apps estarán disponibles pronto. ¡Únete a la lista de espera!');
        });
    });
});
