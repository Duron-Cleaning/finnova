document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const verCalendarioBtn = document.getElementById('verCalendarioBtn');
    const calendarioPagos = document.getElementById('calendarioPagos');
    const calendarioContainer = document.getElementById('calendarioContainer');
    const mensajeAtraso = document.getElementById('mensajeAtraso');

    // Simulación de datos del crédito (esto vendría del backend)
    const creditoData = {
        montoAprobado: 7000.00,
        plazo: 6,
        tasaInteres: 5,
        cuotaMensual: 1268.33,
        totalPagar: 7610.00,
        fechaPrimerPago: '13/2/2025',
        estado: 'al_dia', // Posibles valores: 'al_dia', 'atrasado'
        pagos: [
            { fecha: '13/2/2025', monto: 1268.33, estado: 'pendiente' },
            { fecha: '13/3/2025', monto: 1268.33, estado: 'pendiente' },
            { fecha: '13/4/2025', monto: 1268.33, estado: 'pendiente' },
            { fecha: '13/5/2025', monto: 1268.33, estado: 'pendiente' },
            { fecha: '13/6/2025', monto: 1268.33, estado: 'pendiente' },
            { fecha: '13/7/2025', monto: 1268.33, estado: 'pendiente' }
        ]
    };

    // Función para formatear montos en Lempiras
    function formatoLempiras(monto) {
        return monto.toLocaleString('es-HN', { 
            style: 'currency', 
            currency: 'HNL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    // Mostrar datos del crédito
    function mostrarDatosCredito() {
        document.getElementById('montoAprobado').textContent = formatoLempiras(creditoData.montoAprobado);
        document.getElementById('plazoCredito').textContent = `${creditoData.plazo} meses`;
        document.getElementById('tasaInteres').textContent = `${creditoData.tasaInteres}% mensual`;
        document.getElementById('cuotaMensual').textContent = formatoLempiras(creditoData.cuotaMensual);
        document.getElementById('totalPagar').textContent = formatoLempiras(creditoData.totalPagar);
        document.getElementById('fechaPrimerPago').textContent = creditoData.fechaPrimerPago;

        // Mostrar estado del crédito
        const estadoCredito = document.getElementById('estadoCredito');
        if (creditoData.estado === 'atrasado') {
            estadoCredito.textContent = 'Atrasado';
            estadoCredito.style.color = '#F44336';
            mensajeAtraso.classList.remove('hidden');
        } else {
            estadoCredito.textContent = 'Al día';
            estadoCredito.style.color = '#4CAF50';
            mensajeAtraso.classList.add('hidden');
        }
    }

    // Generar calendario de pagos
    function generarCalendarioPagos() {
        calendarioContainer.innerHTML = '';
        creditoData.pagos.forEach((pago, index) => {
            const pagoElement = document.createElement('div');
            pagoElement.className = `pago-item ${pago.estado}`;
            pagoElement.innerHTML = `
                <div class="pago-info">
                    <div class="fecha">Cuota ${index + 1} - ${pago.fecha}</div>
                    <div class="monto">${formatoLempiras(pago.monto)}</div>
                </div>
                ${pago.estado === 'pagado' ? '<span class="material-icons" style="color: #4CAF50">check_circle</span>' : ''}
            `;
            calendarioContainer.appendChild(pagoElement);
        });
    }

    // Event Listeners
    verCalendarioBtn.addEventListener('click', function() {
        const isHidden = calendarioPagos.classList.contains('hidden');
        if (isHidden) {
            calendarioPagos.classList.remove('hidden');
            generarCalendarioPagos();
            verCalendarioBtn.innerHTML = `
                <span class="material-icons">calendar_month</span>
                Ocultar Calendario
            `;
        } else {
            calendarioPagos.classList.add('hidden');
            verCalendarioBtn.innerHTML = `
                <span class="material-icons">calendar_month</span>
                Ver Calendario de Pagos
            `;
        }
    });

    // Inicializar la página
    mostrarDatosCredito();
});
