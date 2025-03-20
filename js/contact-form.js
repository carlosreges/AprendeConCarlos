document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Mostrar modal de éxito
                    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                    successModal.show();
                    
                    // Limpiar formulario
                    contactForm.reset();
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.');
            });
        });
    }
}); 