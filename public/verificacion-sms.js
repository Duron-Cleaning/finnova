document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phoneNumber');
    const sendCodeButton = document.getElementById('sendCodeButton');
    const verifyCodeButton = document.getElementById('verifyCodeButton');
    const resendCodeButton = document.getElementById('resendCodeButton');
    const verificationContainer = document.getElementById('verificationContainer');
    const verificationMessage = document.getElementById('verificationMessage');
    const testCodeSpan = document.getElementById('testCode');
    const codeInputs = document.querySelectorAll('.code-input');
    let resendTimer;
    let currentCode;

    // Ocultar el contenedor de verificación inicialmente
    verificationContainer.style.display = 'none';

    // Validar entrada de teléfono (solo números)
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Generar código aleatorio de 4 dígitos
    function generateCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    // Manejar el envío del código
    sendCodeButton.addEventListener('click', async function() {
        const phoneNumber = phoneInput.value;
        if (phoneNumber.length === 8) {
            sendCodeButton.disabled = true;
            try {
                // Generar y mostrar el código de prueba
                currentCode = generateCode();
                testCodeSpan.textContent = currentCode;
                
                showVerificationContainer();
                startResendTimer();
                showMessage('Código enviado exitosamente', 'success');
                
                // Habilitar el botón después de 60 segundos
                setTimeout(() => {
                    sendCodeButton.disabled = false;
                }, 60000);
            } catch (error) {
                showMessage('Error al enviar el código. Intenta nuevamente.', 'error');
                sendCodeButton.disabled = false;
            }
        }
    });

    // Manejar la entrada del código
    codeInputs.forEach((input, index) => {
        // Asegurarse de que solo se puedan ingresar números
        input.addEventListener('keypress', function(e) {
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });

        input.addEventListener('input', function(e) {
            // Limpiar cualquier carácter no numérico
            this.value = this.value.replace(/[^0-9]/g, '');
            
            if (this.value.length === 1) {
                // Mover al siguiente input
                if (index < codeInputs.length - 1) {
                    codeInputs[index + 1].focus();
                }
            }

            // Habilitar el botón de verificación si todos los campos están llenos
            verifyCodeButton.disabled = !isCodeComplete();
        });

        // Manejar el borrado
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });

        // Seleccionar todo el contenido al hacer focus
        input.addEventListener('focus', function() {
            this.select();
        });
    });

    // Verificar código
    verifyCodeButton.addEventListener('click', async function() {
        const code = Array.from(codeInputs).map(input => input.value).join('');
        verifyCodeButton.disabled = true;
        
        // Verificar si el código ingresado coincide con el código generado
        if (code === currentCode) {
            window.smsVerified = true;
            showMessage('Verificación exitosa', 'success');
            disableVerificationInputs();
        } else {
            showMessage('Código incorrecto. Intenta nuevamente.', 'error');
            resetCodeInputs();
            verifyCodeButton.disabled = true;
        }
    });

    // Reenviar código
    resendCodeButton.addEventListener('click', async function() {
        resendCodeButton.disabled = true;
        try {
            // Generar nuevo código
            currentCode = generateCode();
            testCodeSpan.textContent = currentCode;
            
            startResendTimer();
            showMessage('Código reenviado exitosamente', 'success');
            resetCodeInputs();
        } catch (error) {
            showMessage('Error al reenviar el código', 'error');
            resendCodeButton.disabled = false;
        }
    });

    // Funciones auxiliares
    function showVerificationContainer() {
        verificationContainer.style.display = 'block';
        codeInputs[0].focus();
    }

    function startResendTimer() {
        let timeLeft = 60;
        resendCodeButton.disabled = true;
        
        if (resendTimer) clearInterval(resendTimer);
        
        const timerElement = document.getElementById('resendTimer');
        resendTimer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(resendTimer);
                resendCodeButton.disabled = false;
                timerElement.textContent = '60';
            }
        }, 1000);
    }

    function isCodeComplete() {
        return Array.from(codeInputs).every(input => input.value.length === 1);
    }

    function resetCodeInputs() {
        codeInputs.forEach(input => {
            input.value = '';
            input.disabled = false;
        });
        codeInputs[0].focus();
    }

    function disableVerificationInputs() {
        phoneInput.disabled = true;
        sendCodeButton.disabled = true;
        codeInputs.forEach(input => input.disabled = true);
        verifyCodeButton.disabled = true;
        resendCodeButton.disabled = true;
        if (resendTimer) clearInterval(resendTimer);
    }

    function showMessage(text, type) {
        verificationMessage.textContent = text;
        verificationMessage.className = `verification-message ${type}`;
    }
});
