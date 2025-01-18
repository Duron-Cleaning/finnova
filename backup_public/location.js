class LocationPermissionManager {
    constructor() {
        this.modal = null;
        this.init();
        this.checkAndShowModal();
    }

    init() {
        // Crear el modal
        const modalHTML = `
            <div id="locationModal" class="location-modal">
                <div class="location-content">
                    <div class="location-icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                        </svg>
                    </div>
                    <h2>¿Permitir que FINNOVA acceda a la ubicación de este dispositivo?</h2>
                    
                    <div class="location-types">
                        <div class="location-type">
                            <div class="location-map precise">
                                <div class="map-grid"></div>
                                <div class="map-dot"></div>
                            </div>
                            <p>Precisa</p>
                        </div>
                        <div class="location-type">
                            <div class="location-map approximate">
                                <div class="map-area"></div>
                            </div>
                            <p>Aproximada</p>
                        </div>
                    </div>

                    <button class="option-button" onclick="locationManager.requestLocation('persistent')">Mientras la app está en uso</button>
                    <button class="option-button" onclick="locationManager.requestLocation('one-time')">Solo esta vez</button>
                    <button class="option-button deny-button" onclick="locationManager.denyPermission()">No permitir</button>
                </div>
            </div>
        `;

        // Agregar estilos
        const styles = `
            .location-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                z-index: 1000;
                display: none;
            }

            .location-content {
                max-width: 380px;
                margin: 20px auto;
                padding: 20px;
                text-align: center;
            }

            .location-icon {
                width: 48px;
                height: 48px;
                margin: 0 auto 20px;
            }

            .location-icon svg {
                width: 100%;
                height: 100%;
                fill: #4a148c;
            }

            .location-types {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin: 20px 0;
            }

            .location-type {
                text-align: center;
            }

            .location-map {
                width: 100px;
                height: 100px;
                border: 2px solid #4a148c;
                border-radius: 50%;
                position: relative;
                margin-bottom: 10px;
            }

            .map-grid {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(0deg, transparent 39%, rgba(74, 20, 140, 0.1) 40%, rgba(74, 20, 140, 0.1) 59%, transparent 60%),
                            linear-gradient(90deg, transparent 39%, rgba(74, 20, 140, 0.1) 40%, rgba(74, 20, 140, 0.1) 59%, transparent 60%);
            }

            .map-dot {
                width: 8px;
                height: 8px;
                background: #4a148c;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .map-area {
                width: 60px;
                height: 60px;
                background: rgba(74, 20, 140, 0.2);
                border-radius: 12px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .option-button {
                display: block;
                width: 100%;
                padding: 12px;
                margin: 10px 0;
                border: none;
                border-radius: 8px;
                background: #4a148c;
                color: white;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .option-button:hover {
                background: #6a1b9a;
            }

            .deny-button {
                background: #e0e0e0;
                color: #333;
            }

            .deny-button:hover {
                background: #bdbdbd;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);

        // Agregar el modal al DOM
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);
        this.modal = document.getElementById('locationModal');
    }

    checkAndShowModal() {
        // Verificar si ya se mostró el modal anteriormente
        if (!localStorage.getItem('locationPermissionShown')) {
            this.showModal();
            // Marcar que ya se mostró el modal
            localStorage.setItem('locationPermissionShown', 'true');
        }
    }

    showModal() {
        if (this.modal) {
            this.modal.style.display = 'block';
        }
    }

    hideModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    async requestLocation(type) {
        try {
            const position = await this.getCurrentPosition();
            console.log('Ubicación obtenida:', position);
            this.hideModal();
        } catch (error) {
            console.error('Error al obtener la ubicación:', error);
            this.hideModal();
        }
    }

    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocalización no soportada'));
                return;
            }

            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });
    }

    denyPermission() {
        console.log('Permiso de ubicación denegado');
        this.hideModal();
    }
}

// Inicializar el manejador de ubicación
let locationManager;
document.addEventListener('DOMContentLoaded', () => {
    locationManager = new LocationPermissionManager();
});
