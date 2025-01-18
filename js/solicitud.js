document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos del simulador almacenados en localStorage
    const montoSimulado = localStorage.getItem('montoSimulado');
    const plazoSimulado = localStorage.getItem('plazoSimulado');

    // Si hay un monto simulado, establecerlo en el campo
    if (montoSimulado) {
        document.getElementById('monto').value = montoSimulado;
        document.getElementById('monto').readOnly = true;
    }

    // Validación del formulario
    const form = document.getElementById('solicitudForm');
    const inputs = form.querySelectorAll('input[required]');

    // Función para validar el número de identidad
    function validarIdentidad(identidad) {
        return /^\d{13}$/.test(identidad);
    }

    // Función para validar el teléfono
    function validarTelefono(telefono) {
        return /^\+504\s\d{4}-\d{4}$/.test(telefono);
    }

    // Función para validar el email
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Función para mostrar error
    function mostrarError(input, mensaje) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = mensaje;
        input.classList.add('error');
    }

    // Función para limpiar error
    function limpiarError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = '';
        input.classList.remove('error');
    }

    // Validación en tiempo real
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validarCampo(this);
        });

        input.addEventListener('blur', function() {
            validarCampo(this);
        });
    });

    // Función para validar cada campo
    function validarCampo(input) {
        const valor = input.value.trim();
        
        switch(input.id) {
            case 'nombre':
                if (valor.length < 3) {
                    mostrarError(input, 'El nombre debe tener al menos 3 caracteres');
                } else {
                    limpiarError(input);
                }
                break;
            
            case 'identidad':
                if (!validarIdentidad(valor)) {
                    mostrarError(input, 'Ingrese un número de identidad válido (13 dígitos)');
                } else {
                    limpiarError(input);
                }
                break;
            
            case 'telefono':
                if (!validarTelefono(valor)) {
                    mostrarError(input, 'Ingrese un teléfono válido (+504 XXXX-XXXX)');
                } else {
                    limpiarError(input);
                }
                break;
            
            case 'email':
                if (!validarEmail(valor)) {
                    mostrarError(input, 'Ingrese un correo electrónico válido');
                } else {
                    limpiarError(input);
                }
                break;
        }
    }

    // Manejar la subida de archivo
    const inputArchivo = document.getElementById('documento');
    const nombreArchivo = document.querySelector('.file-name');

    inputArchivo.addEventListener('change', function() {
        if (this.files.length > 0) {
            nombreArchivo.textContent = this.files[0].name;
        } else {
            nombreArchivo.textContent = '';
        }
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let hayErrores = false;

        // Validar todos los campos antes de enviar
        inputs.forEach(input => {
            if (!input.value.trim()) {
                mostrarError(input, 'Este campo es requerido');
                hayErrores = true;
            } else {
                validarCampo(input);
                if (input.classList.contains('error')) {
                    hayErrores = true;
                }
            }
        });

        if (!hayErrores) {
            // Guardar datos en localStorage
            const formData = {
                nombre: form.nombre.value,
                identidad: form.identidad.value,
                telefono: form.telefono.value,
                email: form.email.value,
                monto: form.monto.value
            };

            localStorage.setItem('solicitudData', JSON.stringify(formData));
            
            // Redireccionar a la página de revisión
            window.location.href = 'revision-confirmacion.html';
        }
    });
});
