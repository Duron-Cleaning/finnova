class LoanApplicationManager {
    constructor() {
        this.scoringService = new LoanScoringService();
        this.currentApplication = {};
        this.init();
    }

    init() {
        // Inicializar event listeners
        document.addEventListener('DOMContentLoaded', () => {
            this.setupFormListeners();
        });
    }

    setupFormListeners() {
        const form = document.getElementById('loanApplicationForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleFormSubmission(e.target);
            });
        }
    }

    async handleFormSubmission(form) {
        try {
            // Recopilar datos del formulario
            const formData = new FormData(form);
            this.currentApplication = {
                customerId: formData.get('customerId'),
                monthlyIncome: parseFloat(formData.get('monthlyIncome')),
                employmentTime: parseFloat(formData.get('employmentTime')),
                employmentType: formData.get('employmentType'),
                gender: formData.get('genero'),
                creditHistory: {
                    latePayments: parseInt(formData.get('latePayments') || '0'),
                    defaultedLoans: parseInt(formData.get('defaultedLoans') || '0'),
                    currentDebts: parseFloat(formData.get('currentDebts') || '0')
                },
                location: {
                    riskZone: false, // Se obtendría de la API de geolocalización
                    verifiable: true,
                    distanceToWork: 0 // Se calcularía con la API de mapas
                },
                documents: {
                    dui: formData.get('dui') ? true : false,
                    proofOfIncome: formData.get('proofOfIncome') ? true : false,
                    bankStatements: formData.get('bankStatements') ? true : false,
                    employmentLetter: formData.get('employmentLetter') ? true : false
                },
                isExistingCustomer: formData.get('isExistingCustomer') === 'true'
            };

            // Calcular score
            const scoringResult = await this.scoringService.calculateFinalScore(this.currentApplication);
            
            // Guardar resultado
            await this.saveLoanApplication(scoringResult);

            // Redirigir basado en el resultado
            this.handleScoringResult(scoringResult);

        } catch (error) {
            console.error('Error processing loan application:', error);
            this.showError('Hubo un error al procesar su solicitud. Por favor, intente nuevamente.');
        }
    }

    async saveLoanApplication(scoringResult) {
        // TODO: Implementar guardado en backend
        const applicationData = {
            ...this.currentApplication,
            scoringResult,
            timestamp: new Date().toISOString()
        };

        // Guardar en localStorage temporalmente
        localStorage.setItem('lastLoanApplication', JSON.stringify(applicationData));
    }

    handleScoringResult(result) {
        switch(result.status) {
            case 'APPROVED_PREMIUM':
            case 'APPROVED':
                window.location.href = '/solicitud-confirmacion.html?status=approved&score=' + result.score;
                break;
            case 'APPROVED_WITH_CONDITIONS':
                window.location.href = '/solicitud-confirmacion.html?status=conditional&score=' + result.score;
                break;
            case 'REJECTED':
                window.location.href = '/solicitud-rechazada.html?score=' + result.score;
                break;
        }
    }

    showError(message) {
        // TODO: Implementar UI para mostrar errores
        alert(message);
    }
}

// Inicializar el manejador de solicitudes
window.loanApplicationManager = new LoanApplicationManager();
