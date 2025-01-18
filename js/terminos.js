// Función para descargar los términos en PDF
function descargarPDF() {
    // Aquí se implementará la lógica para descargar el PDF
    alert('La descarga de términos y condiciones comenzará en breve...');
}

// Función para manejar la aceptación de términos
function aceptarTerminos() {
    // Aquí se implementará la lógica para registrar la aceptación
    // Por ahora, solo redirigimos al usuario a la página principal
    localStorage.setItem('terminosAceptados', 'true');
    window.location.href = 'index.html';
}
