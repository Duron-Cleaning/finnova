// Elementos del DOM
const editModal = document.getElementById('editModal');
const passwordModal = document.getElementById('passwordModal');
const modalTitle = document.getElementById('modalTitle');
const modalLabel = document.getElementById('modalLabel');
const modalInput = document.getElementById('modalInput');

// Campo actual siendo editado
let campoActual = '';

// Datos de ejemplo del usuario (en producción vendrían de una API)
let userData = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@email.com',
    telefono: '+504 9999-9999'
};

// Validaciones
const validaciones = {
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Ingresa un correo electrónico válido';
    },
    telefono: (value) => {
        const telefonoRegex = /^\+504 \d{4}-\d{4}$/;
        return telefonoRegex.test(value) ? '' : 'Ingresa un número de teléfono válido (+504 XXXX-XXXX)';
    },
    nombre: (value) => {
        return value.length >= 3 ? '' : 'El nombre debe tener al menos 3 caracteres';
    }
};

// Abrir modal de edición
function editarCampo(campo) {
    campoActual = campo;
    const valor = userData[campo];
    
    modalTitle.textContent = `Editar ${getCampoLabel(campo)}`;
    modalLabel.textContent = getCampoLabel(campo);
    modalInput.value = valor;
    modalInput.type = campo === 'email' ? 'email' : 'text';
    
    if (campo === 'telefono') {
        modalInput.placeholder = '+504 XXXX-XXXX';
    }
    
    editModal.style.display = 'block';
}

// Obtener label del campo
function getCampoLabel(campo) {
    const labels = {
        nombre: 'Nombre completo',
        email: 'Correo electrónico',
        telefono: 'Teléfono'
    };
    return labels[campo];
}

// Guardar cambios
async function guardarCambios(event) {
    event.preventDefault();
    const valor = modalInput.value.trim();
    const errorMessage = validaciones[campoActual](valor);
    const errorElement = modalInput.nextElementSibling;

    if (errorMessage) {
        errorElement.textContent = errorMessage;
        return;
    }

    try {
        // Aquí iría la llamada a la API para actualizar los datos
        await simularLlamadaAPI();
        
        // Actualizar datos locales
        userData[campoActual] = valor;
        document.getElementById(`${campoActual}Usuario`).textContent = valor;
        
        // Cerrar modal
        cerrarModal();
        
        // Mostrar mensaje de éxito
        alert('Datos actualizados correctamente');
    } catch (error) {
        alert('Error al actualizar los datos. Por favor, intenta nuevamente.');
    }
}

// Cambiar contraseña
function cambiarPassword() {
    passwordModal.style.display = 'block';
}

// Guardar nueva contraseña
async function guardarPassword(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    // Validar que las contraseñas coincidan
    if (newPassword.value !== confirmPassword.value) {
        confirmPassword.nextElementSibling.textContent = 'Las contraseñas no coinciden';
        return;
    }

    // Validar longitud mínima
    if (newPassword.value.length < 8) {
        newPassword.nextElementSibling.textContent = 'La contraseña debe tener al menos 8 caracteres';
        return;
    }

    try {
        // Aquí iría la llamada a la API para cambiar la contraseña
        await simularLlamadaAPI();
        
        // Limpiar formulario y cerrar modal
        document.getElementById('passwordForm').reset();
        cerrarModalPassword();
        
        // Mostrar mensaje de éxito
        alert('Contraseña actualizada correctamente');
    } catch (error) {
        alert('Error al actualizar la contraseña. Por favor, intenta nuevamente.');
    }
}

// Cerrar sesión
async function cerrarSesion() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        try {
            // Aquí iría la llamada a la API para cerrar sesión
            await simularLlamadaAPI();
            
            // Redireccionar al login
            window.location.href = 'login.html';
        } catch (error) {
            alert('Error al cerrar sesión. Por favor, intenta nuevamente.');
        }
    }
}

// Funciones auxiliares
function cerrarModal() {
    editModal.style.display = 'none';
    modalInput.nextElementSibling.textContent = '';
}

function cerrarModalPassword() {
    passwordModal.style.display = 'none';
    document.getElementById('passwordForm').reset();
    document.querySelectorAll('#passwordForm .error-message').forEach(error => {
        error.textContent = '';
    });
}

// Simular llamada a API
function simularLlamadaAPI() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

// Event listeners
window.onclick = function(event) {
    if (event.target == editModal) {
        cerrarModal();
    }
    if (event.target == passwordModal) {
        cerrarModalPassword();
    }
};

// Variables globales para manejo de edición
let campoEditandoActual = null;
let valorOriginal = null;

// Función para habilitar la edición de un campo
function habilitarEdicion(inputId, nombreCampo) {
    const input = document.getElementById(inputId);
    const btnEditar = input.nextElementSibling;
    
    // Si hay otro campo en edición, guardarlo primero
    if (campoEditandoActual && campoEditandoActual !== inputId) {
        guardarCambios(campoEditandoActual);
    }
    
    // Guardar el valor original
    valorOriginal = input.value;
    
    // Habilitar el input
    input.disabled = false;
    input.classList.add('editando');
    input.focus();
    
    // Cambiar el botón de "Editar" a "Guardar"
    btnEditar.innerHTML = '<span class="material-icons">save</span>Guardar';
    btnEditar.onclick = () => guardarCambios(inputId, nombreCampo);
    
    // Guardar referencia del campo actual
    campoEditandoActual = inputId;
    
    // Agregar eventos de teclado
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            guardarCambios(inputId, nombreCampo);
        } else if (e.key === 'Escape') {
            cancelarEdicion(inputId);
        }
    });
}

// Función para cancelar la edición
function cancelarEdicion(inputId) {
    const input = document.getElementById(inputId);
    const btnEditar = input.nextElementSibling;
    
    // Restaurar valor original
    input.value = valorOriginal;
    input.disabled = true;
    input.classList.remove('editando');
    
    // Restaurar botón
    btnEditar.innerHTML = '<span class="material-icons">edit</span>Editar';
    btnEditar.onclick = () => habilitarEdicion(inputId, obtenerNombreCampo(inputId));
    
    // Limpiar variables
    campoEditandoActual = null;
    valorOriginal = null;
}

// Función para guardar los cambios
function guardarCambios(inputId, nombreCampo) {
    const input = document.getElementById(inputId);
    const btnEditar = input.nextElementSibling;
    const nuevoValor = input.value.trim();
    
    // Validaciones
    if (!validarCampo(inputId, nuevoValor)) {
        return;
    }
    
    // Simular guardado en backend
    console.log(`Guardando ${nombreCampo}: ${nuevoValor}`);
    
    // Actualizar UI
    input.disabled = true;
    input.classList.remove('editando');
    
    // Restaurar botón
    btnEditar.innerHTML = '<span class="material-icons">edit</span>Editar';
    btnEditar.onclick = () => habilitarEdicion(inputId, nombreCampo);
    
    // Limpiar variables
    campoEditandoActual = null;
    valorOriginal = null;
    
    // Mostrar mensaje de éxito
    mostrarToast(`${nombreCampo} actualizado correctamente`);
}

// Funciones de validación
function validarCampo(inputId, valor) {
    if (!valor) {
        mostrarToast('Este campo no puede estar vacío', true);
        return false;
    }
    
    switch (inputId) {
        case 'correo':
            if (!validarEmail(valor)) {
                mostrarToast('Por favor ingrese un correo electrónico válido', true);
                return false;
            }
            break;
            
        case 'telefono':
            if (!validarTelefono(valor)) {
                mostrarToast('Por favor ingrese un número de teléfono válido (+XXX XXXX-XXXX)', true);
                return false;
            }
            break;
            
        case 'fechaNacimiento':
            if (!validarFecha(valor)) {
                mostrarToast('Por favor ingrese una fecha válida', true);
                return false;
            }
            break;
    }
    
    return true;
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefono(telefono) {
    return /^\+\d{3}\s\d{4}-\d{4}$/.test(telefono);
}

function validarFecha(fecha) {
    const date = new Date(fecha);
    return date instanceof Date && !isNaN(date);
}

// Funciones para el modal de contraseña
function abrirModalContrasena() {
    const modal = document.getElementById('modalContrasena');
    modal.style.display = 'flex';
    
    // Limpiar campos
    document.getElementById('contrasenaActual').value = '';
    document.getElementById('nuevaContrasena').value = '';
    document.getElementById('confirmarContrasena').value = '';
}

function cerrarModalContrasena() {
    document.getElementById('modalContrasena').style.display = 'none';
}

function cambiarContrasena() {
    const contrasenaActual = document.getElementById('contrasenaActual').value;
    const nuevaContrasena = document.getElementById('nuevaContrasena').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;
    
    // Validaciones
    if (!contrasenaActual) {
        mostrarToast('Por favor ingrese su contraseña actual', true);
        return;
    }
    
    if (nuevaContrasena.length < 8) {
        mostrarToast('La contraseña debe tener al menos 8 caracteres', true);
        return;
    }
    
    if (nuevaContrasena !== confirmarContrasena) {
        mostrarToast('Las contraseñas no coinciden', true);
        return;
    }
    
    // Simular cambio de contraseña
    console.log('Cambiando contraseña...');
    
    // Cerrar modal y mostrar mensaje de éxito
    cerrarModalContrasena();
    mostrarToast('Contraseña actualizada correctamente');
}

// Función para mostrar mensajes toast
function mostrarToast(mensaje, esError = false) {
    const toast = document.createElement('div');
    toast.className = `toast ${esError ? 'error' : ''}`;
    toast.textContent = mensaje;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Función auxiliar para obtener nombres de campos
function obtenerNombreCampo(inputId) {
    const nombres = {
        'nombre': 'Nombre Completo',
        'correo': 'Correo Electrónico',
        'telefono': 'Teléfono',
        'direccion': 'Dirección',
        'ocupacion': 'Ocupación',
        'fechaNacimiento': 'Fecha de Nacimiento'
    };
    return nombres[inputId] || inputId;
}

// Inicializar botones de edición
document.addEventListener('DOMContentLoaded', function() {
    const botonesEditar = document.querySelectorAll('.btn-editar');
    botonesEditar.forEach(btn => {
        const input = btn.previousElementSibling;
        if (input && input.id) {
            btn.onclick = () => {
                if (input.id === 'contrasena') {
                    abrirModalContrasena();
                } else {
                    habilitarEdicion(input.id, obtenerNombreCampo(input.id));
                }
            };
        }
    });
});

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('modalContrasena');
    if (event.target === modal) {
        cerrarModalContrasena();
    }
};

// Funciones para el modal de métodos de pago
function openPaymentModal() {
    document.getElementById('payment-modal').style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function seleccionarMetodoPago(tipo) {
    console.log(`Método de pago seleccionado: ${tipo}`);
    
    // Si hay un monto pendiente de pago, guardarlo
    const montoPendiente = document.querySelector('#modalPagoCuota #montoPago');
    if (montoPendiente && montoPendiente.value) {
        localStorage.setItem('montoPendiente', montoPendiente.value);
    }
    
    // Redirigir a la página correspondiente
    if (tipo === 'tarjeta') {
        window.location.href = 'agregar-tarjeta.html';
    } else if (tipo === 'cuenta') {
        window.location.href = 'agregar-cuenta.html';
    }
    closePaymentModal();
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const paymentModal = document.getElementById('payment-modal');
    const passwordModal = document.getElementById('modalContrasena');
    
    if (event.target === paymentModal) {
        closePaymentModal();
    } else if (event.target === passwordModal) {
        cerrarModalContrasena();
    }
};
