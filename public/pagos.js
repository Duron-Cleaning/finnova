// Datos de ejemplo (en producción vendrían de una API)
const prestamo = {
    montoTotal: 5000.00,
    cuotasTotal: 6,
    cuotasPendientes: 4,
    proximaCuota: {
        fecha: '2025-02-15',
        monto: 890.00
    },
    cuotas: [
        { numero: 3, fecha: '2025-02-15', monto: 890.00, estado: 'pendiente' },
        { numero: 4, fecha: '2025-03-15', monto: 890.00, estado: 'pendiente' },
        { numero: 5, fecha: '2025-04-15', monto: 890.00, estado: 'pendiente' },
        { numero: 6, fecha: '2025-05-15', monto: 890.00, estado: 'pendiente' }
    ]
};

// Formatear montos a formato de moneda
function formatMoney(amount) {
    return new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL'
    }).format(amount);
}

// Formatear fechas
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-HN', options);
}

// Cargar datos del préstamo
function cargarDatosPrestamo() {
    document.getElementById('montoTotal').textContent = formatMoney(prestamo.montoTotal);
    document.getElementById('cuotasPendientes').textContent = 
        `${prestamo.cuotasPendientes} de ${prestamo.cuotasTotal}`;
    document.getElementById('fechaVencimiento').textContent = 
        formatDate(prestamo.proximaCuota.fecha);
    document.getElementById('montoCuota').textContent = 
        formatMoney(prestamo.proximaCuota.monto);

    cargarCuotasPendientes();
}

// Cargar lista de cuotas pendientes
function cargarCuotasPendientes() {
    const cuotasList = document.getElementById('cuotasList');
    cuotasList.innerHTML = '';

    prestamo.cuotas.forEach(cuota => {
        const cuotaElement = document.createElement('div');
        cuotaElement.className = 'cuota-card';
        cuotaElement.innerHTML = `
            <div class="cuota-info">
                <div class="cuota-detail">
                    <span class="label">Cuota ${cuota.numero}</span>
                    <span class="value">${formatDate(cuota.fecha)}</span>
                </div>
                <div class="cuota-detail">
                    <span class="label">Monto</span>
                    <span class="value">${formatMoney(cuota.monto)}</span>
                </div>
            </div>
        `;
        cuotasList.appendChild(cuotaElement);
    });
}

// Modal de pago
const modal = document.getElementById('pagoModal');
const closeBtn = document.querySelector('.close-modal');

function iniciarPago() {
    modal.style.display = 'block';
}

function cerrarModal() {
    modal.style.display = 'none';
}

async function pagarCon(metodo) {
    try {
        // Aquí iría la integración con el proveedor de pagos
        console.log(`Iniciando pago con ${metodo}`);
        
        // Simular proceso de pago
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simular éxito
        alert('¡Pago realizado con éxito!');
        cerrarModal();
        
        // Actualizar estado del préstamo
        actualizarEstadoPrestamo();
        
        // Enviar confirmación por correo (simulado)
        enviarConfirmacion();
    } catch (error) {
        console.error('Error en el pago:', error);
        alert('Hubo un error al procesar el pago. Por favor, intenta nuevamente.');
    }
}

function actualizarEstadoPrestamo() {
    // Aquí se actualizaría el estado del préstamo en el backend
    prestamo.cuotasPendientes--;
    prestamo.cuotas.shift();
    cargarDatosPrestamo();
}

function enviarConfirmacion() {
    // Aquí iría la lógica para enviar confirmación por correo/SMS
    console.log('Enviando confirmación de pago...');
}

function verHistorial() {
    // Redireccionar a la página de historial
    window.location.href = 'historial-pagos.html';
}

// Event listeners
closeBtn.onclick = cerrarModal;
window.onclick = function(event) {
    if (event.target == modal) {
        cerrarModal();
    }
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', cargarDatosPrestamo);
