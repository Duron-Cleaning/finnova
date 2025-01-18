document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos de la solicitud del localStorage
    const solicitudData = JSON.parse(localStorage.getItem('solicitudData') || '{}');
    const simuladorData = {
        monto: localStorage.getItem('montoSimulado'),
        plazo: localStorage.getItem('plazoSimulado'),
        cuota: localStorage.getItem('cuotaSimulada'),
        desembolso: localStorage.getItem('desembolsoSimulado'),
        fechaPago: localStorage.getItem('fechaPagoSimulada')
    };

    // Mostrar datos personales
    document.getElementById('nombreConfirmacion').textContent = solicitudData.nombre || '';
    document.getElementById('identidadConfirmacion').textContent = solicitudData.identidad || '';
    document.getElementById('telefonoConfirmacion').textContent = solicitudData.telefono || '';
    document.getElementById('emailConfirmacion').textContent = solicitudData.email || '';

    // Mostrar datos del crédito
    document.getElementById('montoConfirmacion').textContent = 
        `L. ${parseFloat(simuladorData.monto).toLocaleString('es-HN')}`;
    document.getElementById('plazoConfirmacion').textContent = 
        `${simuladorData.plazo} meses`;
    document.getElementById('cuotaConfirmacion').textContent = 
        `L. ${parseFloat(simuladorData.cuota).toLocaleString('es-HN')}`;
    document.getElementById('desembolsoConfirmacion').textContent = 
        `L. ${parseFloat(simuladorData.desembolso).toLocaleString('es-HN')}`;
    document.getElementById('fechaPagoConfirmacion').textContent = 
        simuladorData.fechaPago || '';

    // Verificar si todos los datos necesarios están presentes
    if (!solicitudData.nombre || !simuladorData.monto) {
        window.location.href = 'completar-solicitud.html';
    }
});

async function confirmarSolicitud() {
    try {
        const solicitudData = JSON.parse(localStorage.getItem('solicitudData') || '{}');
        const simuladorData = {
            monto: localStorage.getItem('montoSimulado'),
            plazo: localStorage.getItem('plazoSimulado'),
            cuota: localStorage.getItem('cuotaSimulada'),
            desembolso: localStorage.getItem('desembolsoSimulado'),
            fechaPago: localStorage.getItem('fechaPagoSimulada')
        };

        // Aquí se implementaría la llamada al API para enviar la solicitud
        // Por ahora, simulamos una espera
        const confirmButton = document.querySelector('.confirm-button');
        const originalText = confirmButton.innerHTML;
        confirmButton.disabled = true;
        confirmButton.innerHTML = '<span class="material-icons">hourglass_empty</span> Procesando...';

        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simular envío de correo/SMS
        console.log('Enviando confirmación por correo a:', solicitudData.email);
        console.log('Enviando confirmación por SMS a:', solicitudData.telefono);

        // Limpiar datos del localStorage
        localStorage.removeItem('solicitudData');
        localStorage.removeItem('montoSimulado');
        localStorage.removeItem('plazoSimulado');
        localStorage.removeItem('cuotaSimulada');
        localStorage.removeItem('desembolsoSimulado');
        localStorage.removeItem('fechaPagoSimulada');

        // Mostrar mensaje de éxito y redireccionar
        alert('¡Solicitud enviada con éxito! Recibirás un correo de confirmación en breve.');
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        alert('Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.');
    }
}
