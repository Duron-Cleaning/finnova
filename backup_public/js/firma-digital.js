document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('signatureCanvas');
    const clearButton = document.getElementById('clearButton');
    const submitButton = document.querySelector('.submit-button');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hasSignature = false;

    // Configurar el canvas para que sea responsive
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = 200;
        
        // Configurar el estilo de dibujo
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    // Llamar a resizeCanvas cuando la página carga y cuando se redimensiona
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Funciones para dibujar
    function startDrawing(e) {
        isDrawing = true;
        hasSignature = true;
        [lastX, lastY] = getCoordinates(e);
        validateForm(); // Actualizar estado del botón submit
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();

        const [currentX, currentY] = getCoordinates(e);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        [lastX, lastY] = [currentX, currentY];
    }

    // Obtener coordenadas tanto para eventos táctiles como de mouse
    function getCoordinates(e) {
        let x, y;
        
        if (e.type.includes('touch')) {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            x = touch.clientX - rect.left;
            y = touch.clientY - rect.top;
        } else {
            const rect = canvas.getBoundingClientRect();
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        return [x, y];
    }

    // Eventos táctiles
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
    canvas.addEventListener('touchmove', draw);

    // Eventos de mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', stopDrawing);

    // Limpiar firma
    clearButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hasSignature = false;
        validateForm(); // Actualizar estado del botón submit
    });

    // Función para validar el formulario
    function validateForm() {
        const form = document.getElementById('loanForm');
        const allInputsValid = Array.from(form.querySelectorAll('input[required]'))
            .every(input => input.value.trim() !== '');
        
        submitButton.disabled = !allInputsValid || !hasSignature;
    }

    // Agregar la firma al formulario antes de enviar
    document.getElementById('loanForm').addEventListener('submit', function(e) {
        if (!hasSignature) {
            e.preventDefault();
            alert('Por favor, agrega tu firma antes de enviar la solicitud.');
            return;
        }

        // Convertir la firma a imagen y agregarla al formulario
        const signatureData = canvas.toDataURL('image/png');
        let signatureInput = document.getElementById('signatureData');
        if (!signatureInput) {
            signatureInput = document.createElement('input');
            signatureInput.type = 'hidden';
            signatureInput.id = 'signatureData';
            signatureInput.name = 'signatureData';
            this.appendChild(signatureInput);
        }
        signatureInput.value = signatureData;
    });

    // Agregar validación en tiempo real para todos los campos
    document.querySelectorAll('input[required]').forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('change', validateForm);
    });
});
