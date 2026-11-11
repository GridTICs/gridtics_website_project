document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MENÚ RESPONSIVE (MÓVIL)
       ========================================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambiar ícono de menú hamburguesa a 'X'
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Cerrar menú móvil al hacer clic en cualquier enlace de navegación
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* ==========================================================================
       VALIDACIÓN DEL FORMULARIO DE CONTACTO
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Referencias a los campos
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const asunto = document.getElementById('asunto');
            const mensaje = document.getElementById('mensaje');
            const formAlert = document.getElementById('formAlert');

            // Limpiar errores previos
            clearErrors();

            let isValid = true;

            // Validar Nombre
            if (nombre.value.trim() === '') {
                showError('nombreError', 'El nombre es obligatorio.');
                isValid = false;
            }

            // Validar Email
            if (email.value.trim() === '') {
                showError('emailError', 'El correo electrónico es obligatorio.');
                isValid = false;
            } else if (!validateEmail(email.value.trim())) {
                showError('emailError', 'Ingresá un correo electrónico válido.');
                isValid = false;
            }

            // Validar Asunto
            if (asunto.value.trim() === '') {
                showError('asuntoError', 'El asunto es obligatorio.');
                isValid = false;
            }

            // Validar Mensaje
            if (mensaje.value.trim() === '') {
                showError('mensajeError', 'El mensaje no puede estar vacío.');
                isValid = false;
            }

            // Si todo es válido
            if (isValid) {
                showAlert(formAlert, 'alert-success', '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
                contactForm.reset();
            } else {
                showAlert(formAlert, 'alert-error', 'Por favor, completá correctamente los campos marcados.');
            }
        });
    }

    // Funciones auxiliares de validación
    function showError(elementId, message) {
        const errorSpan = document.getElementById(elementId);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    function clearErrors() {
        const errorSpans = document.querySelectorAll('.error-text');
        errorSpans.forEach(span => span.textContent = '');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showAlert(element, className, message) {
        if (!element) return;
        element.className = `alert-message ${className}`;
        element.textContent = message;
        element.style.display = 'block';

        // Ocultar alerta automáticamente después de 5 segundos
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
});
