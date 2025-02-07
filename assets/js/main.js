// Debugging helper
const debug = (msg) => {
    if (window.location.hostname === 'localhost') {
        console.log(`[Debug] ${msg}`);
    }
};

// Prevenir scroll automático
function preventAutoScroll() {
    if (window.location.hash) {
        debug('Previniendo scroll automático');
        window.scrollTo(0, 0);
        
        // Remover el hash sin causar scroll
        history.replaceState('', document.title, window.location.pathname);
        
        // Doble check para asegurar que estamos arriba
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    debug('DOM Cargado');
    
    // Prevenir scroll automático inmediatamente
    preventAutoScroll();
    
    // También prevenir en la carga completa
    window.addEventListener('load', preventAutoScroll);

    // Detectar y ajustar la URL base
    const baseUrl = window.location.origin;
    debug(`URL Base: ${baseUrl}`);

    // Ajustar rutas absolutas
    function fixUrls() {
        const elements = {
            links: document.querySelectorAll('a[href^="/"]'),
            css: document.querySelectorAll('link[rel="stylesheet"][href^="/"]'),
            images: document.querySelectorAll('img[src^="/"]')
        };

        Object.entries(elements).forEach(([type, nodeList]) => {
            nodeList.forEach(el => {
                const attr = type === 'images' ? 'src' : 'href';
                const oldValue = el.getAttribute(attr);
                if (oldValue.startsWith('/')) {
                    const newValue = `${baseUrl}${oldValue}`;
                    el.setAttribute(attr, newValue);
                    debug(`Fixed ${type} path: ${oldValue} -> ${newValue}`);
                }
            });
        });
    }

    fixUrls();

    // Manejar scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                debug(`Scrolling to: ${targetId}`);
                const headerOffset = 64;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Actualizar URL sin causar scroll
                history.pushState(null, null, `#${targetId}`);
            } else {
                debug(`Target element not found: ${targetId}`);
            }
        });
    });

    // Manejar formulario
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        debug('Formulario encontrado');
        waitlistForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            if (!emailInput || !submitButton) {
                debug('Error: Elementos del formulario no encontrados');
                return;
            }
            
            const email = emailInput.value.trim();
            if (!email) {
                alert('Por favor ingresa tu email');
                return;
            }
            
            try {
                debug(`Procesando email: ${email}`);
                emailInput.disabled = true;
                submitButton.disabled = true;
                submitButton.style.opacity = '0.7';
                
                // Aquí iría la llamada al backend
                await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
                
                debug('Email registrado exitosamente');
                alert('¡Gracias por unirte! Te contactaremos pronto.');
                this.reset();
            } catch (error) {
                debug(`Error en el formulario: ${error.message}`);
                console.error('Error:', error);
                alert('Hubo un error. Por favor intenta de nuevo.');
            } finally {
                emailInput.disabled = false;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }
        });
    } else {
        debug('Error: Formulario no encontrado');
    }

    // Botones CTA
    document.querySelectorAll('.cta-primary').forEach(button => {
        if (!button.closest('form')) {
            button.addEventListener('click', () => {
                debug('CTA clicked');
            });
        }
    });

    // Botones de tienda
    document.querySelectorAll('.store-button').forEach(button => {
        button.addEventListener('click', () => {
            debug('Store button clicked');
            alert('Las apps estarán disponibles pronto. ¡Únete a la lista de espera!');
        });
    });
});
