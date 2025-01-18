// Datos de ejemplo (en producción vendrían de una API)
const historialPagos = [
    {
        id: 1,
        fecha: '2025-01-10',
        monto: 890.00,
        metodo: 'Tarjeta de crédito',
        estado: 'confirmado'
    },
    {
        id: 2,
        fecha: '2024-12-10',
        monto: 890.00,
        metodo: 'Transferencia bancaria',
        estado: 'confirmado'
    },
    {
        id: 3,
        fecha: '2024-11-10',
        monto: 890.00,
        metodo: 'Tarjeta de débito',
        estado: 'confirmado'
    }
];

// Formatear montos a formato de moneda
function formatMoney(amount) {
    return new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL'
    }).format(amount);
}

// Formatear fechas
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-HN', options);
}

// Cargar pagos en la lista
function cargarPagos(pagos) {
    const pagosList = document.getElementById('pagosList');
    const template = document.getElementById('pagoTemplate');
    pagosList.innerHTML = '';

    pagos.forEach(pago => {
        const clone = template.content.cloneNode(true);
        
        // Llenar datos
        clone.querySelector('.fecha-valor').textContent = formatDate(pago.fecha);
        clone.querySelector('.monto-valor').textContent = formatMoney(pago.monto);
        clone.querySelector('.metodo-valor').textContent = pago.metodo;
        
        const estadoElement = clone.querySelector('.estado-valor');
        estadoElement.textContent = pago.estado.charAt(0).toUpperCase() + pago.estado.slice(1);
        estadoElement.classList.add(`estado-${pago.estado}`);
        
        // Agregar id para la descarga
        const descargarBtn = clone.querySelector('.descargar-button');
        descargarBtn.dataset.id = pago.id;
        
        pagosList.appendChild(clone);
    });
}

// Algoritmos de ordenamiento y filtrado
function ordenarTransacciones(transacciones, criterio = 'fecha', orden = 'desc') {
    return [...transacciones].sort((a, b) => {
        if (criterio === 'fecha') {
            const fechaA = new Date(a.fecha);
            const fechaB = new Date(b.fecha);
            return orden === 'desc' ? fechaB - fechaA : fechaA - fechaB;
        }
        if (criterio === 'monto') {
            return orden === 'desc' ? b.monto - a.monto : a.monto - b.monto;
        }
        return 0;
    });
}

function filtrarTransaccionesPorPeriodo(transacciones, inicio, fin) {
    return transacciones.filter(transaccion => {
        const fechaTransaccion = new Date(transaccion.fecha);
        const fechaInicio = inicio ? new Date(inicio) : new Date(0);
        const fechaFin = fin ? new Date(fin) : new Date();
        return fechaTransaccion >= fechaInicio && fechaTransaccion <= fechaFin;
    });
}

// Cálculo de estadísticas
function calcularEstadisticasPago(transacciones) {
    const stats = {
        total: 0,
        promedio: 0,
        maximo: 0,
        minimo: Infinity,
        totalConfirmados: 0,
        totalPendientes: 0
    };

    if (transacciones.length === 0) return stats;

    transacciones.forEach(transaccion => {
        // Actualizar totales
        stats.total += transaccion.monto;
        stats.maximo = Math.max(stats.maximo, transaccion.monto);
        stats.minimo = Math.min(stats.minimo, transaccion.monto);
        
        // Contar por estado
        if (transaccion.estado === 'confirmado') {
            stats.totalConfirmados++;
        } else if (transaccion.estado === 'pendiente') {
            stats.totalPendientes++;
        }
    });

    stats.promedio = stats.total / transacciones.length;
    stats.minimo = stats.minimo === Infinity ? 0 : stats.minimo;

    return stats;
}

// Generación de reportes
function generarReporteTransacciones(transacciones, tipo = 'resumen') {
    const fechaGeneracion = new Date().toLocaleDateString('es-HN');
    
    switch (tipo) {
        case 'resumen':
            const stats = calcularEstadisticasPago(transacciones);
            return {
                fechaGeneracion,
                tipoReporte: 'Resumen de Transacciones',
                datos: {
                    totalTransacciones: transacciones.length,
                    montoTotal: formatMoney(stats.total),
                    promedioTransaccion: formatMoney(stats.promedio),
                    transaccionMaxima: formatMoney(stats.maximo),
                    transaccionMinima: formatMoney(stats.minimo),
                    pagosConfirmados: stats.totalConfirmados,
                    pagosPendientes: stats.totalPendientes
                }
            };
            
        case 'detallado':
            return {
                fechaGeneracion,
                tipoReporte: 'Reporte Detallado de Transacciones',
                datos: transacciones.map(t => ({
                    fecha: formatDate(t.fecha),
                    monto: formatMoney(t.monto),
                    metodo: t.metodo,
                    estado: t.estado,
                    id: t.id
                }))
            };
    }
}

// Función auxiliar para exportar reporte a CSV
function exportarReporteCSV(reporte) {
    let csv = '';
    
    if (reporte.tipoReporte.includes('Resumen')) {
        // Cabecera para reporte resumen
        csv = 'Concepto,Valor\n';
        Object.entries(reporte.datos).forEach(([key, value]) => {
            csv += `${key},${value}\n`;
        });
    } else {
        // Cabecera para reporte detallado
        csv = 'ID,Fecha,Monto,Método de Pago,Estado\n';
        reporte.datos.forEach(row => {
            csv += `${row.id},${row.fecha},${row.monto},${row.metodo},${row.estado}\n`;
        });
    }
    
    return csv;
}

// Aplicar filtros
function aplicarFiltros() {
    const fechaDesde = document.getElementById('fechaDesde').value;
    const fechaHasta = document.getElementById('fechaHasta').value;
    const estado = document.getElementById('estado').value;

    // Primero filtrar por fecha
    let pagosFiltrados = filtrarTransaccionesPorPeriodo(historialPagos, fechaDesde, fechaHasta);

    // Luego filtrar por estado
    if (estado !== 'todos') {
        pagosFiltrados = pagosFiltrados.filter(pago => pago.estado === estado);
    }

    // Ordenar por fecha más reciente
    pagosFiltrados = ordenarTransacciones(pagosFiltrados, 'fecha', 'desc');

    cargarPagos(pagosFiltrados);
}

// Descargar recibo
async function descargarRecibo(id) {
    try {
        // Aquí iría la llamada a la API para generar el PDF
        console.log(`Generando recibo para el pago ${id}`);
        
        // Simular proceso de generación
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // En producción, esto descargaría el PDF real
        alert('Recibo descargado correctamente');
    } catch (error) {
        console.error('Error al descargar el recibo:', error);
        alert('Hubo un error al descargar el recibo. Por favor, intenta nuevamente.');
    }
}

// Inicializar fechas del filtro
function inicializarFiltros() {
    const hoy = new Date();
    const tresMesesAtras = new Date();
    tresMesesAtras.setMonth(hoy.getMonth() - 3);

    document.getElementById('fechaDesde').valueAsDate = tresMesesAtras;
    document.getElementById('fechaHasta').valueAsDate = hoy;
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    inicializarFiltros();
    cargarPagos(historialPagos);
});
