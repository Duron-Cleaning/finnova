document.addEventListener('DOMContentLoaded', function() {
    // Manejo de la foto de perfil
    const profilePhotoInput = document.getElementById('profile-photo');
    const profileImageContainer = document.getElementById('profile-image-container');
    
    profilePhotoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB máximo
                mostrarNotificacion('La imagen no debe superar los 5MB', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                profileImageContainer.innerHTML = `<img src="${event.target.result}" alt="Foto de perfil" style="width: 100%; height: 100%; object-fit: cover;">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Funcionalidad para los botones de editar campos
    const camposEditables = document.querySelectorAll('.campo');
    
    camposEditables.forEach(campo => {
        const input = campo.querySelector('input');
        const btnEditar = campo.querySelector('.btn-editar');
        
        if (!input || !btnEditar) return;

        btnEditar.addEventListener('click', function() {
            if (input.disabled) {
                input.disabled = false;
                input.focus();
                btnEditar.innerHTML = `
                    <span class="material-icons">save</span>
                    Guardar
                `;
            } else {
                if (input.value.trim() === '') {
                    mostrarNotificacion('Este campo no puede estar vacío', 'error');
                    return;
                }
                input.disabled = true;
                btnEditar.innerHTML = `
                    <span class="material-icons">edit</span>
                    Editar
                `;
                mostrarNotificacion('Cambios guardados correctamente');
            }
        });
    });

    // Funcionalidad para abrir modal de contraseña
    window.abrirModalContrasena = function() {
        document.getElementById('modalContrasena').style.display = 'flex';
    };

    // Funcionalidad para cerrar modal de contraseña
    window.cerrarModalContrasena = function() {
        document.getElementById('modalContrasena').style.display = 'none';
        // Limpiar campos
        document.getElementById('contrasenaActual').value = '';
        document.getElementById('nuevaContrasena').value = '';
        document.getElementById('confirmarContrasena').value = '';
    };

    // Funcionalidad para cambiar contraseña
    window.cambiarContrasena = function() {
        const contrasenaActual = document.getElementById('contrasenaActual').value;
        const nuevaContrasena = document.getElementById('nuevaContrasena').value;
        const confirmarContrasena = document.getElementById('confirmarContrasena').value;

        if (!contrasenaActual || !nuevaContrasena || !confirmarContrasena) {
            mostrarNotificacion('Todos los campos son obligatorios', 'error');
            return;
        }

        if (nuevaContrasena !== confirmarContrasena) {
            mostrarNotificacion('Las contraseñas no coinciden', 'error');
            return;
        }

        // Aquí iría la validación con el backend
        mostrarNotificacion('Contraseña actualizada correctamente');
        cerrarModalContrasena();
    };

    // Funcionalidad para métodos de pago
    window.openPaymentModal = function() {
        document.getElementById('payment-modal').style.display = 'flex';
    };

    window.closePaymentModal = function() {
        document.getElementById('payment-modal').style.display = 'none';
    };

    window.seleccionarMetodoPago = function(tipo) {
        const modal = document.getElementById('payment-modal');
        
        if (tipo === 'tarjeta') {
            const formHTML = `
                <div class="payment-form">
                    <div class="form-group">
                        <label>Número de Tarjeta</label>
                        <input type="text" id="numeroTarjeta" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Fecha de Vencimiento</label>
                            <input type="text" id="fechaVencimiento" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="password" id="cvv" placeholder="123" maxlength="4">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Nombre en la Tarjeta</label>
                        <input type="text" id="nombreTarjeta" placeholder="Como aparece en la tarjeta">
                    </div>
                    <div class="form-actions">
                        <button onclick="closePaymentModal()" class="btn-cancelar">Cancelar</button>
                        <button onclick="guardarTarjeta()" class="btn-guardar">Guardar Tarjeta</button>
                    </div>
                </div>
            `;
            
            const modalContent = modal.querySelector('.payment-modal-content');
            modalContent.innerHTML = `
                <div class="payment-modal-header">
                    <h2>Agregar Tarjeta</h2>
                    <button class="payment-modal-close" onclick="closePaymentModal()">
                        <span class="material-icons">close</span>
                    </button>
                </div>
                ${formHTML}
            `;
        } else if (tipo === 'cuenta') {
            const bancosHonduras = [
                'Banco Atlántida',
                'Banco de Occidente',
                'Banco de los Trabajadores',
                'Banpaís',
                'Ficohsa',
                'BAC Credomatic',
                'Banco Promerica',
                'Davivienda',
                'Lafise',
                'Banco Popular',
                'Banco Azteca',
                'Banrural'
            ];
            
            const bancoOptions = bancosHonduras.map(banco => 
                `<option value="${banco}">${banco}</option>`
            ).join('');

            const formHTML = `
                <div class="payment-form">
                    <div class="form-group">
                        <label>Banco</label>
                        <select id="bancoSelect">
                            <option value="">Selecciona un banco</option>
                            ${bancoOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Tipo de Cuenta</label>
                        <select id="tipoCuenta">
                            <option value="">Selecciona el tipo de cuenta</option>
                            <option value="ahorro">Cuenta de Ahorro</option>
                            <option value="cheques">Cuenta de Cheques</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Número de Cuenta</label>
                        <input type="text" id="numeroCuenta" placeholder="Número de cuenta">
                    </div>
                    <div class="form-group">
                        <label>Nombre del Titular</label>
                        <input type="text" id="titularCuenta" placeholder="Nombre completo del titular">
                    </div>
                    <div class="form-group">
                        <label>Identidad del Titular</label>
                        <input type="text" id="identidadTitular" placeholder="0801-1990-12345">
                    </div>
                    <div class="form-actions">
                        <button onclick="closePaymentModal()" class="btn-cancelar">Cancelar</button>
                        <button onclick="guardarCuenta()" class="btn-guardar">Guardar Cuenta</button>
                    </div>
                </div>
            `;
            
            const modalContent = modal.querySelector('.payment-modal-content');
            modalContent.innerHTML = `
                <div class="payment-modal-header">
                    <h2>Agregar Cuenta Bancaria</h2>
                    <button class="payment-modal-close" onclick="closePaymentModal()">
                        <span class="material-icons">close</span>
                    </button>
                </div>
                ${formHTML}
            `;
        }
    };

    window.guardarTarjeta = function() {
        const numeroTarjeta = document.getElementById('numeroTarjeta').value.replace(/\s/g, '');
        const fechaVencimiento = document.getElementById('fechaVencimiento').value;
        const cvv = document.getElementById('cvv').value;
        const nombreTarjeta = document.getElementById('nombreTarjeta').value;

        if (!numeroTarjeta || !fechaVencimiento || !cvv || !nombreTarjeta) {
            mostrarNotificacion('Todos los campos son obligatorios', 'error');
            return;
        }

        if (!/^\d{16}$/.test(numeroTarjeta)) {
            mostrarNotificacion('Número de tarjeta inválido', 'error');
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(fechaVencimiento)) {
            mostrarNotificacion('Fecha de vencimiento inválida (MM/YY)', 'error');
            return;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            mostrarNotificacion('CVV inválido', 'error');
            return;
        }

        // Aquí iría la lógica para guardar en el backend
        mostrarNotificacion('Tarjeta agregada correctamente');
        closePaymentModal();
    };

    window.guardarCuenta = function() {
        const banco = document.getElementById('bancoSelect').value;
        const tipoCuenta = document.getElementById('tipoCuenta').value;
        const numeroCuenta = document.getElementById('numeroCuenta').value;
        const titular = document.getElementById('titularCuenta').value;
        const identidad = document.getElementById('identidadTitular').value;

        if (!banco || !tipoCuenta || !numeroCuenta || !titular || !identidad) {
            mostrarNotificacion('Todos los campos son obligatorios', 'error');
            return;
        }

        if (!/^\d{13,20}$/.test(numeroCuenta)) {
            mostrarNotificacion('Número de cuenta inválido', 'error');
            return;
        }

        if (!/^\d{4}-\d{4}-\d{5}$/.test(identidad)) {
            mostrarNotificacion('Número de identidad inválido (0801-1990-12345)', 'error');
            return;
        }

        // Aquí iría la lógica para guardar en el backend
        mostrarNotificacion('Cuenta bancaria agregada correctamente');
        closePaymentModal();
    };

    // Funcionalidad para cambio de contraseña
    const btnSeguridad = document.querySelector('.seguridad .btn-accion');
    btnSeguridad.addEventListener('click', function() {
        const modal = document.getElementById('modalContrasena');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>Cambiar Contraseña</h2>
                <span class="close-btn" onclick="document.getElementById('modalContrasena').style.display='none'">&times;</span>
            </div>
            <div class="password-form">
                <div class="form-group">
                    <label>Contraseña Actual</label>
                    <input type="password" id="currentPassword" placeholder="Ingresa tu contraseña actual">
                </div>
                <div class="form-group">
                    <label>Nueva Contraseña</label>
                    <input type="password" id="newPassword" placeholder="Ingresa tu nueva contraseña">
                </div>
                <div class="form-group">
                    <label>Confirmar Nueva Contraseña</label>
                    <input type="password" id="confirmPassword" placeholder="Confirma tu nueva contraseña">
                </div>
                <div class="password-requirements">
                    <p>La contraseña debe contener:</p>
                    <ul>
                        <li>Al menos 8 caracteres</li>
                        <li>Al menos una letra mayúscula</li>
                        <li>Al menos una letra minúscula</li>
                        <li>Al menos un número</li>
                        <li>Al menos un carácter especial</li>
                    </ul>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="document.getElementById('modalContrasena').style.display='none'" class="btn-cancelar">Cancelar</button>
                    <button type="button" onclick="cambiarContrasena()" class="btn-guardar">Cambiar Contraseña</button>
                </div>
            </div>
        `;

        // Agregar estilos específicos para el botón de cierre
        const closeButtonStyle = document.createElement('style');
        closeButtonStyle.textContent = `
            .close-btn {
                position: absolute;
                right: 20px;
                top: 15px;
                font-size: 24px;
                font-weight: bold;
                color: #666;
                cursor: pointer;
                transition: color 0.2s;
            }
            .close-btn:hover {
                color: #333;
            }
            .modal-header {
                position: relative;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            .btn-cancelar {
                background-color: #6c757d;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                margin-right: 10px;
            }
            .btn-cancelar:hover {
                background-color: #5a6268;
            }
        `;
        document.head.appendChild(closeButtonStyle);
        
        modal.style.display = 'flex';
    });

    window.cambiarContrasena = function() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            mostrarNotificacion('Todos los campos son obligatorios', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            mostrarNotificacion('Las contraseñas nuevas no coinciden', 'error');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            mostrarNotificacion('La nueva contraseña no cumple con los requisitos', 'error');
            return;
        }

        // Aquí iría la lógica para cambiar la contraseña en el backend
        mostrarNotificacion('Contraseña actualizada correctamente');
        document.getElementById('modalContrasena').style.display='none';
    };

    // Funcionalidad para el historial de créditos
    window.showHistorial = function() {
        const modal = document.getElementById('historialModal');
        const modalContent = modal.querySelector('.modal-content');
        
        const historial = [
            {
                tipo: 'Préstamo Personal',
                monto: 'L. 50,000.00',
                fecha: '15/01/2025',
                estado: 'Activo',
                pagado: 'L. 10,000.00',
                pendiente: 'L. 40,000.00',
                proximoPago: '15/02/2025'
            },
            {
                tipo: 'Préstamo Hipotecario',
                monto: 'L. 1,500,000.00',
                fecha: '10/06/2024',
                estado: 'Activo',
                pagado: 'L. 150,000.00',
                pendiente: 'L. 1,350,000.00',
                proximoPago: '10/02/2025'
            },
            {
                tipo: 'Préstamo Vehicular',
                monto: 'L. 300,000.00',
                fecha: '20/03/2024',
                estado: 'Activo',
                pagado: 'L. 100,000.00',
                pendiente: 'L. 200,000.00',
                proximoPago: '20/02/2025'
            }
        ];

        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>Historial de Créditos</h2>
                <span class="close-btn" onclick="document.getElementById('historialModal').style.display='none'">&times;</span>
            </div>
            <div class="historial-list">
                ${historial.map(credito => `
                    <div class="credito-item">
                        <div class="credito-header">
                            <h3>${credito.tipo}</h3>
                            <span class="estado ${credito.estado.toLowerCase()}">${credito.estado}</span>
                        </div>
                        <div class="credito-details">
                            <div class="detail-row">
                                <span>Monto Total:</span>
                                <strong>${credito.monto}</strong>
                            </div>
                            <div class="detail-row">
                                <span>Fecha de Inicio:</span>
                                <strong>${credito.fecha}</strong>
                            </div>
                            <div class="detail-row">
                                <span>Monto Pagado:</span>
                                <strong>${credito.pagado}</strong>
                            </div>
                            <div class="detail-row">
                                <span>Monto Pendiente:</span>
                                <strong>${credito.pendiente}</strong>
                            </div>
                            <div class="detail-row">
                                <span>Próximo Pago:</span>
                                <strong>${credito.proximoPago}</strong>
                            </div>
                        </div>
                        <div class="credito-actions">
                            <button onclick="verDetallesCredito('${credito.tipo}')" class="btn-detalles">
                                <span class="material-icons">visibility</span>
                                Ver Detalles
                            </button>
                            <button onclick="descargarEstadoCuenta('${credito.tipo}')" class="btn-descargar">
                                <span class="material-icons">download</span>
                                Estado de Cuenta
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Agregar estilos específicos para el historial
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }
            .modal-content {
                background: white;
                padding: 0;
                border-radius: 8px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow: hidden;
                position: relative;
            }
            .historial-list {
                padding: 20px;
                max-height: calc(90vh - 60px);
                overflow-y: auto;
            }
            .credito-item {
                background: #fff;
                border-radius: 8px;
                padding: 20px;
                margin-bottom: 15px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .credito-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            .credito-header h3 {
                margin: 0;
                color: #333;
                font-size: 18px;
                font-weight: 600;
            }
            .estado {
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
            }
            .estado.activo {
                background-color: #e8f5e9;
                color: #2e7d32;
            }
            .credito-details {
                background: #f8f9fa;
                border-radius: 6px;
                padding: 15px;
            }
            .detail-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding: 8px 0;
                border-bottom: 1px solid #eee;
            }
            .detail-row:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            .detail-row span {
                color: #666;
            }
            .detail-row strong {
                color: #333;
                font-weight: 600;
            }
            .credito-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
                justify-content: flex-end;
            }
            .btn-detalles, .btn-descargar {
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s;
            }
            .btn-detalles {
                background-color: #673ab7;
                color: white;
            }
            .btn-detalles:hover {
                background-color: #5e35b1;
            }
            .btn-descargar {
                background-color: #f5f5f5;
                color: #333;
            }
            .btn-descargar:hover {
                background-color: #e0e0e0;
            }
            .close-btn {
                position: absolute;
                right: 20px;
                top: 15px;
                font-size: 24px;
                font-weight: bold;
                color: #666;
                cursor: pointer;
                transition: color 0.2s;
            }
            .close-btn:hover {
                color: #333;
            }
            .modal-header {
                position: relative;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            .modal-header h2 {
                margin: 0;
                color: #333;
            }
        `;
        document.head.appendChild(modalStyles);
        
        modal.style.display = 'flex';
    };

    // Funciones para manejar acciones de créditos
    window.verDetallesCredito = function(tipoCredito) {
        mostrarNotificacion(`Mostrando detalles de: ${tipoCredito}`);
    };

    window.descargarEstadoCuenta = function(tipoCredito) {
        mostrarNotificacion(`Descargando estado de cuenta de: ${tipoCredito}`);
    };

    // Cerrar modales al hacer clic fuera de ellos
    window.onclick = function(event) {
        const modales = [
            document.getElementById('documentModal'),
            document.getElementById('modalContrasena'),
            document.getElementById('payment-modal'),
            document.getElementById('historialModal')
        ];
        
        modales.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    };

    // Función global para cerrar cualquier modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Agregar estilos para los modales
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .password-form,
        .historial-list {
            padding: 20px;
            max-height: 70vh;
            overflow-y: auto;
        }
        .password-requirements {
            margin: 16px 0;
            padding: 12px;
            background: #f5f5f5;
            border-radius: 4px;
        }
        .password-requirements p {
            margin: 0 0 8px;
            font-weight: 500;
        }
        .password-requirements ul {
            margin: 0;
            padding-left: 20px;
        }
        .password-requirements li {
            margin: 4px 0;
            font-size: 12px;
            color: #666;
        }
        .credito-item {
            background: white;
            border: 1px solid #eee;
            border-radius: 8px;
            margin-bottom: 16px;
            padding: 16px;
        }
        .credito-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        .credito-header h3 {
            margin: 0;
            font-size: 16px;
            color: #333;
        }
        .estado {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
        }
        .estado.activo {
            background: #e8f5e9;
            color: #2e7d32;
        }
        .credito-details {
            margin-bottom: 16px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
            font-size: 14px;
        }
        .detail-row span {
            color: #666;
        }
        .credito-actions {
            display: flex;
            gap: 8px;
        }
        .btn-detalles,
        .btn-descargar {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            transition: background-color 0.2s;
        }
        .btn-detalles {
            background: #f5f5f5;
            color: #333;
        }
        .btn-descargar {
            background: #4a148c;
            color: white;
        }
        .btn-detalles:hover {
            background: #eee;
        }
        .btn-descargar:hover {
            background: #6a1b9a;
        }
    `;
    document.head.appendChild(modalStyles);

    // Agregar estilos dinámicamente para los formularios de pago
    const style = document.createElement('style');
    style.textContent = `
        .payment-form {
            padding: 20px;
        }
        .form-group {
            margin-bottom: 16px;
        }
        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 500;
        }
        .form-group input,
        .form-group select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        .form-row {
            display: flex;
            gap: 16px;
        }
        .form-row .form-group {
            flex: 1;
        }
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 24px;
        }
        .btn-cancelar,
        .btn-guardar {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
        }
        .btn-cancelar {
            background: #f5f5f5;
            color: #666;
        }
        .btn-guardar {
            background: #4a148c;
            color: white;
        }
        .btn-cancelar:hover {
            background: #eee;
        }
        .btn-guardar:hover {
            background: #6a1b9a;
        }
    `;
    document.head.appendChild(style);

    // Agregar listeners para formato de tarjeta
    document.addEventListener('input', function(e) {
        if (e.target.id === 'numeroTarjeta') {
            e.target.value = e.target.value.replace(/\D/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim();
        } else if (e.target.id === 'fechaVencimiento') {
            e.target.value = e.target.value.replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .substr(0, 5);
        } else if (e.target.id === 'identidadTitular') {
            e.target.value = e.target.value.replace(/\D/g, '')
                .replace(/(\d{4})(\d{4})(\d{5})/, '$1-$2-$3')
                .substr(0, 14);
        }
    });

    // Funcionalidad para documentos
    const documentos = {
        'contratos': {
            titulo: 'Contratos Digitales',
            documentos: [
                {
                    nombre: 'Contrato de Préstamo Personal',
                    fecha: '15/01/2025',
                    tipo: 'PDF',
                    tamaño: '2.5 MB'
                },
                {
                    nombre: 'Contrato de Cuenta de Ahorro',
                    fecha: '10/12/2024',
                    tipo: 'PDF',
                    tamaño: '1.8 MB'
                },
                {
                    nombre: 'Contrato de Servicios Digitales',
                    fecha: '05/01/2025',
                    tipo: 'PDF',
                    tamaño: '1.2 MB'
                }
            ]
        },
        'comprobantes': {
            titulo: 'Comprobantes de Pago',
            documentos: [
                {
                    nombre: 'Pago de Préstamo Personal - Enero 2025',
                    fecha: '15/01/2025',
                    tipo: 'PDF',
                    tamaño: '500 KB'
                },
                {
                    nombre: 'Pago de Préstamo Personal - Diciembre 2024',
                    fecha: '15/12/2024',
                    tipo: 'PDF',
                    tamaño: '500 KB'
                },
                {
                    nombre: 'Pago de Préstamo Hipotecario - Enero 2025',
                    fecha: '10/01/2025',
                    tipo: 'PDF',
                    tamaño: '500 KB'
                }
            ]
        },
        'certificados': {
            titulo: 'Certificados',
            documentos: [
                {
                    nombre: 'Certificado de No Adeudo',
                    fecha: '16/01/2025',
                    tipo: 'PDF',
                    tamaño: '1.1 MB'
                },
                {
                    nombre: 'Certificado de Cliente Preferencial',
                    fecha: '01/01/2025',
                    tipo: 'PDF',
                    tamaño: '900 KB'
                }
            ]
        },
        'repositorio': {
            titulo: 'Repositorio General',
            documentos: [
                {
                    nombre: 'Estado de Cuenta - Enero 2025',
                    fecha: '15/01/2025',
                    tipo: 'PDF',
                    tamaño: '1.5 MB'
                },
                {
                    nombre: 'Reporte Anual 2024',
                    fecha: '05/01/2025',
                    tipo: 'PDF',
                    tamaño: '3.2 MB'
                },
                {
                    nombre: 'Constancia de Intereses 2024',
                    fecha: '10/01/2025',
                    tipo: 'PDF',
                    tamaño: '800 KB'
                }
            ]
        }
    };

    // Función para mostrar documentos
    function mostrarDocumentos(tipo) {
        const modal = document.getElementById('documentModal');
        const modalContent = modal.querySelector('.modal-content');
        const data = documentos[tipo];
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${data.titulo}</h2>
                <span class="close-btn" onclick="document.getElementById('documentModal').style.display='none'">&times;</span>
            </div>
            <div class="documentos-list">
                ${data.documentos.map(doc => `
                    <div class="documento-item">
                        <div class="documento-info">
                            <div class="documento-icon">
                                <span class="material-icons">${doc.tipo.toLowerCase() === 'pdf' ? 'picture_as_pdf' : 'description'}</span>
                            </div>
                            <div class="documento-details">
                                <h3>${doc.nombre}</h3>
                                <div class="documento-metadata">
                                    <span class="fecha">Fecha: ${doc.fecha}</span>
                                    <span class="tipo">Tipo: ${doc.tipo}</span>
                                    <span class="tamaño">Tamaño: ${doc.tamaño}</span>
                                </div>
                            </div>
                        </div>
                        <div class="documento-actions">
                            <button onclick="descargarDocumento('${doc.nombre}')" class="btn-descargar">
                                <span class="material-icons">download</span>
                                Descargar
                            </button>
                            <button onclick="verDocumento('${doc.nombre}')" class="btn-ver">
                                <span class="material-icons">visibility</span>
                                Ver
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Agregar estilos específicos para documentos
        const docStyles = document.createElement('style');
        docStyles.textContent = `
            .documentos-list {
                padding: 20px;
                max-height: 70vh;
                overflow-y: auto;
            }
            .documento-item {
                background: #fff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .documento-info {
                display: flex;
                align-items: center;
                gap: 15px;
                flex: 1;
            }
            .documento-icon {
                background: #f5f5f5;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .documento-icon .material-icons {
                color: #673ab7;
                font-size: 24px;
            }
            .documento-details h3 {
                margin: 0 0 5px 0;
                color: #333;
                font-size: 16px;
            }
            .documento-metadata {
                display: flex;
                gap: 15px;
                color: #666;
                font-size: 14px;
            }
            .documento-actions {
                display: flex;
                gap: 10px;
            }
            .btn-descargar, .btn-ver {
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s;
            }
            .btn-descargar {
                background-color: #673ab7;
                color: white;
            }
            .btn-descargar:hover {
                background-color: #5e35b1;
            }
            .btn-ver {
                background-color: #f5f5f5;
                color: #333;
            }
            .btn-ver:hover {
                background-color: #e0e0e0;
            }
        `;
        document.head.appendChild(docStyles);
        
        modal.style.display = 'flex';
    }

    // Event listeners para los botones de documentación
    document.querySelector('.contratos').addEventListener('click', () => mostrarDocumentos('contratos'));
    document.querySelector('.comprobantes').addEventListener('click', () => mostrarDocumentos('comprobantes'));
    document.querySelector('.certificados').addEventListener('click', () => mostrarDocumentos('certificados'));
    document.querySelector('.repositorio').addEventListener('click', () => mostrarDocumentos('repositorio'));

    // Funciones para manejar documentos
    window.descargarDocumento = function(nombreDoc) {
        mostrarNotificacion(`Descargando: ${nombreDoc}`);
        // Aquí iría la lógica real de descarga
    };

    window.verDocumento = function(nombreDoc) {
        mostrarNotificacion(`Visualizando: ${nombreDoc}`);
        // Aquí iría la lógica real de visualización
    };

    // Funcionalidad para cerrar sesión
    const btnCerrarSesion = document.querySelector('.btn-cerrar-sesion');
    btnCerrarSesion.addEventListener('click', function() {
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            window.location.href = 'index.html';
        }
    });

    // Función para mostrar notificaciones
    function mostrarNotificacion(mensaje, tipo = 'success') {
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion';
        notificacion.textContent = mensaje;
        
        Object.assign(notificacion.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: tipo === 'error' ? '#d32f2f' : '#4a148c',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: '1000',
            animation: 'fadeInOut 3s forwards'
        });

        if (!document.querySelector('#notificacion-style')) {
            const style = document.createElement('style');
            style.id = 'notificacion-style';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -20px); }
                    10% { opacity: 1; transform: translate(-50%, 0); }
                    90% { opacity: 1; transform: translate(-50%, 0); }
                    100% { opacity: 0; transform: translate(-50%, -20px); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notificacion);
        setTimeout(() => document.body.removeChild(notificacion), 3000);
    }
});
