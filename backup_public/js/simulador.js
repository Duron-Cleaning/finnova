document.addEventListener('DOMContentLoaded', function() {
    // Variables iniciales
    let plazoSeleccionado = 3;
    const tasaInteresMensual = 0.05; // 5% mensual
    const comisionPorcentaje = 0.03; // 3% de comisión

    // Elementos del DOM
    const montoSlider = document.getElementById('montoSlider');
    const montoValue = document.querySelector('.monto-value');
    const totalDesembolsado = document.getElementById('totalDesembolsado');
    const cuotaMensual = document.getElementById('cuotaMensual');
    const amortizacion = document.getElementById('amortizacion');
    const fechaPago = document.getElementById('fechaPago');
    const plazoBotones = document.querySelectorAll('.plazo-button');
    const siguienteButton = document.querySelector('.siguiente-button');

    // Función para formatear montos en Lempiras
    function formatoLempiras(monto) {
        return `L. ${monto.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Función para calcular la fecha del primer pago (30 días después)
    function calcularFechaPrimerPago() {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + 30);
        return fecha.toLocaleDateString('es-HN');
    }

    // Función para calcular la amortización y los valores relacionados
    function calcularAmortizacion(monto, meses) {
        // Determinar la amortización según el monto
        const amortizacion = monto <= 700 ? 21 : 210;
        
        // Calcular el total desembolsado (monto menos amortización)
        const totalDesembolsado = monto - amortizacion;
        
        // Calcular la cuota mensual
        const cuotaMensual = totalDesembolsado / meses;

        return {
            totalDesembolsado: totalDesembolsado.toFixed(2),
            cuotaMensual: cuotaMensual.toFixed(2),
            amortizacion: amortizacion.toFixed(2)
        };
    }

    // Función para actualizar todos los valores
    function actualizarValores() {
        const montoSeleccionado = parseInt(montoSlider.value);
        const resultados = calcularAmortizacion(montoSeleccionado, plazoSeleccionado);
        
        montoValue.textContent = formatoLempiras(montoSeleccionado);
        totalDesembolsado.textContent = formatoLempiras(parseFloat(resultados.totalDesembolsado));
        cuotaMensual.textContent = formatoLempiras(parseFloat(resultados.cuotaMensual));
        amortizacion.textContent = formatoLempiras(parseFloat(resultados.amortizacion));
        fechaPago.textContent = calcularFechaPrimerPago();

        // Guardar valores para el formulario de solicitud
        localStorage.setItem('montoSimulado', montoSeleccionado);
        localStorage.setItem('plazoSimulado', plazoSeleccionado);
        localStorage.setItem('cuotaSimulada', resultados.cuotaMensual);
        localStorage.setItem('desembolsoSimulado', resultados.totalDesembolsado);
        localStorage.setItem('fechaPagoSimulada', calcularFechaPrimerPago());
    }

    // Event Listeners
    montoSlider.addEventListener('input', function() {
        actualizarValores();
    });

    plazoBotones.forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase active de todos los botones
            plazoBotones.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón seleccionado
            this.classList.add('active');
            // Actualizar plazo seleccionado
            plazoSeleccionado = parseInt(this.dataset.meses);
            actualizarValores();
        });
    });

    // Event listener para el botón Siguiente
    if (siguienteButton) {
        siguienteButton.addEventListener('click', function() {
            window.location.href = 'completar-solicitud.html';
        });
    }

    // Inicializar valores
    plazoBotones[0].classList.add('active');
    actualizarValores();
});
