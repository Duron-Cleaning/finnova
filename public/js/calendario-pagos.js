// Datos de ejemplo
const pagosData = {
    cuotasPagadas: 3,
    totalCuotas: 12,
    montoCuota: 890.00,
    montoTotal: 10680.00,
    pagos: [
        {
            fecha: '2025-01-10',
            monto: 890.00,
            estado: 'pagado'
        },
        {
            fecha: '2025-02-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-03-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-04-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-05-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-06-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-07-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-08-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-09-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-10-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-11-10',
            monto: 890.00,
            estado: 'pendiente'
        },
        {
            fecha: '2025-12-10',
            monto: 890.00,
            estado: 'pendiente'
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const pagosList = document.getElementById('pagosList');
    const pagoTemplate = document.getElementById('pagoItemTemplate');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressMessage = document.getElementById('progressMessage');
    const totalPagado = document.getElementById('totalPagado');
    const totalPendiente = document.getElementById('totalPendiente');

    // Formatear montos a formato de moneda
    function formatMoney(amount) {
        return new Intl.NumberFormat('es-HN', {
            style: 'currency',
            currency: 'HNL'
        }).format(amount);
    }

    // Formatear fechas
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-HN', options);
    }

    // Función para crear un elemento de pago
    function crearElementoPago(pago) {
        const clone = pagoTemplate.content.cloneNode(true);
        
        const statusDot = clone.querySelector('.status-dot');
        statusDot.classList.add(pago.estado);
        
        const fechaText = clone.querySelector('.fecha-text');
        fechaText.textContent = formatDate(pago.fecha);
        
        const montoText = clone.querySelector('.pago-monto');
        montoText.textContent = formatMoney(pago.monto);
        
        if (pago.estado === 'pendiente') {
            const pagarButton = document.createElement('button');
            pagarButton.className = 'pagar-button';
            pagarButton.innerHTML = '<span class="material-icons">payment</span> Pagar';
            pagarButton.onclick = () => window.location.href = 'pagar-cuota.html';
            
            const actionDiv = clone.querySelector('.pago-action');
            actionDiv.appendChild(pagarButton);
        }
        
        return clone;
    }

    // Función para actualizar la barra de progreso
    function actualizarProgreso() {
        const porcentaje = (pagosData.cuotasPagadas / pagosData.totalCuotas) * 100;
        progressFill.style.width = `${porcentaje}%`;
        progressPercentage.textContent = `${Math.round(porcentaje)}%`;

        // Actualizar mensaje según el progreso
        if (porcentaje === 100) {
            progressMessage.textContent = '¡Gracias por mantener tus pagos al día!';
            progressMessage.style.color = '#4CAF50';
        } else {
            progressMessage.textContent = 'Recuerda pagar tus cuotas puntualmente para evitar cargos adicionales.';
            progressMessage.style.color = '#666';
        }
    }

    // Función para actualizar el resumen de pagos
    function actualizarResumen() {
        const totalPagadoValue = pagosData.cuotasPagadas * pagosData.montoCuota;
        const totalPendienteValue = pagosData.montoTotal - totalPagadoValue;
        
        totalPagado.textContent = formatMoney(totalPagadoValue);
        totalPendiente.textContent = formatMoney(totalPendienteValue);
    }

    // Cargar los pagos en la lista
    pagosData.pagos.forEach(pago => {
        const elemento = crearElementoPago(pago);
        pagosList.appendChild(elemento);
    });

    // Actualizar progreso y resumen
    actualizarProgreso();
    actualizarResumen();
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const pagosList = document.getElementById('pagosList');
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressMessage = document.getElementById('progressMessage');
    const totalPagado = document.getElementById('totalPagado');
    const totalPendiente = document.getElementById('totalPendiente');

    // Template para los items de pago
    const pagoTemplate = document.getElementById('pagoItemTemplate');

    // Simulación de datos de pagos (esto vendría del backend)
    const pagosData = {
        totalCuotas: 6,
        cuotasPagadas: 2,
        montoCuota: 1268.33,
        pagos: [
            { fecha: '13/2/2025', monto: 1268.33, estado: 'pagado' },
            { fecha: '13/3/2025', monto: 1268.33, estado: 'pagado' },
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

    // Función para crear un elemento de pago
    function crearElementoPago(pago, index) {
        const clone = pagoTemplate.content.cloneNode(true);
        const pagoItem = clone.querySelector('.pago-item');
        const statusDot = clone.querySelector('.status-dot');
        const fechaText = clone.querySelector('.fecha-text');
        const montoText = clone.querySelector('.pago-monto');
        const pagoAction = clone.querySelector('.pago-action');

        // Agregar clases y contenido
        statusDot.classList.add(pago.estado);
        fechaText.textContent = `Cuota ${index + 1} - ${pago.fecha}`;
        montoText.textContent = formatoLempiras(pago.monto);

        // Agregar botón de pago si está pendiente
        if (pago.estado === 'pendiente') {
            const pagarButton = document.createElement('button');
            pagarButton.className = 'pagar-button';
            pagarButton.innerHTML = `
                <span class="material-icons">payments</span>
                Pagar
            `;
            pagarButton.onclick = () => window.location.href = 'pagar-cuota.html';
            pagoAction.appendChild(pagarButton);
        }

        // Agregar ícono de check si está pagado
        if (pago.estado === 'pagado') {
            const checkIcon = document.createElement('span');
            checkIcon.className = 'material-icons';
            checkIcon.style.color = '#4CAF50';
            checkIcon.textContent = 'check_circle';
            pagoAction.appendChild(checkIcon);
        }

        return clone;
    }

    // Función para actualizar la barra de progreso
    function actualizarProgreso() {
        const porcentaje = (pagosData.cuotasPagadas / pagosData.totalCuotas) * 100;
        progressFill.style.width = `${porcentaje}%`;
        progressPercentage.textContent = `${Math.round(porcentaje)}%`;

        // Actualizar mensaje según el progreso
        if (porcentaje === 100) {
            progressMessage.textContent = '¡Gracias por mantener tus pagos al día!';
            progressMessage.style.color = '#4CAF50';
        } else {
            progressMessage.textContent = 'Recuerda pagar tus cuotas puntualmente para evitar cargos adicionales.';
            progressMessage.style.color = '#666';
        }
    }

    // Función para actualizar el resumen de pagos
    function actualizarResumen() {
        const totalPagadoValue = pagosData.cuotasPagadas * pagosData.montoCuota;
        const totalPendienteValue = (pagosData.totalCuotas - pagosData.cuotasPagadas) * pagosData.montoCuota;

        totalPagado.textContent = formatoLempiras(totalPagadoValue);
        totalPendiente.textContent = formatoLempiras(totalPendienteValue);
    }

    // Función para cargar todos los pagos
    function cargarPagos() {
        pagosList.innerHTML = '';
        pagosData.pagos.forEach((pago, index) => {
            const elemento = crearElementoPago(pago, index);
            pagosList.appendChild(elemento);
        });
    }

    // Inicializar la página
    function inicializar() {
        cargarPagos();
        actualizarProgreso();
        actualizarResumen();
    }

    // Simular actualización en tiempo real (cada 30 segundos)
    setInterval(() => {
        // Aquí iría la llamada al API para obtener datos actualizados
        inicializar();
    }, 30000);

    // Iniciar la página
    inicializar();
});
