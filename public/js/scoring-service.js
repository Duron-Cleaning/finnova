class LoanScoringService {
    constructor() {
        this.scoreFactors = {
            income: 0.3,           // 30% del score
            employment: 0.2,       // 20% del score
            creditHistory: 0.25,   // 25% del score
            location: 0.15,        // 15% del score
            documentation: 0.1     // 10% del score
        };
    }

    calculateBaseScore(applicationData) {
        let score = 0;
        
        // Evaluación de ingresos (0-300 puntos)
        score += this.evaluateIncome(applicationData.monthlyIncome) * this.scoreFactors.income;
        
        // Evaluación de empleo (0-200 puntos)
        score += this.evaluateEmployment(applicationData.employmentTime, applicationData.employmentType) * this.scoreFactors.employment;
        
        // Evaluación de historial crediticio (0-250 puntos)
        score += this.evaluateCreditHistory(applicationData.creditHistory) * this.scoreFactors.creditHistory;
        
        // Evaluación de ubicación (0-150 puntos)
        score += this.evaluateLocation(applicationData.location) * this.scoreFactors.location;
        
        // Evaluación de documentación (0-100 puntos)
        score += this.evaluateDocumentation(applicationData.documents) * this.scoreFactors.documentation;
        
        return Math.round(score);
    }

    evaluateIncome(monthlyIncome) {
        // Base: Salario mínimo en El Salvador
        const minWage = 365;
        const score = (monthlyIncome / minWage) * 100;
        return Math.min(score, 300); // Máximo 300 puntos
    }

    evaluateEmployment(timeInYears, employmentType) {
        let score = 0;
        
        // Puntos por tiempo de empleo
        if (timeInYears >= 5) score += 100;
        else if (timeInYears >= 3) score += 75;
        else if (timeInYears >= 1) score += 50;
        else score += 25;

        // Puntos por tipo de empleo
        switch(employmentType.toLowerCase()) {
            case 'permanent':
                score += 100;
                break;
            case 'contract':
                score += 75;
                break;
            case 'business_owner':
                score += 85;
                break;
            case 'freelance':
                score += 60;
                break;
            default:
                score += 25;
        }

        return score;
    }

    evaluateCreditHistory(history) {
        let score = 250; // Comenzamos con score perfecto
        
        if (history.latePayments) {
            score -= history.latePayments * 30; // -30 puntos por cada pago tardío
        }
        
        if (history.defaultedLoans) {
            score -= history.defaultedLoans * 50; // -50 puntos por cada préstamo en mora
        }
        
        if (history.currentDebts) {
            const debtRatio = history.currentDebts / history.monthlyIncome;
            if (debtRatio > 0.5) score -= 50; // Penalización por alta deuda
        }

        return Math.max(0, score);
    }

    evaluateLocation(location) {
        let score = 150; // Score base para ubicación

        // Factores de riesgo por ubicación
        if (location.riskZone) {
            score -= 50;
        }

        if (!location.verifiable) {
            score -= 30;
        }

        if (location.distanceToWork > 50) { // más de 50km
            score -= 20;
        }

        return Math.max(0, score);
    }

    evaluateDocumentation(documents) {
        let score = 0;
        const requiredDocs = [
            'dui',
            'proofOfIncome',
            'bankStatements',
            'employmentLetter'
        ];

        // +25 puntos por cada documento requerido
        requiredDocs.forEach(doc => {
            if (documents[doc]) score += 25;
        });

        return score;
    }

    async calculateFinalScore(applicationData) {
        try {
            // Obtener score base
            const baseScore = this.calculateBaseScore(applicationData);
            
            // Factores de ajuste
            let adjustmentFactors = 1;

            // Ajuste por historial con la institución
            if (applicationData.isExistingCustomer) {
                const customerHistory = await this.getCustomerHistory(applicationData.customerId);
                adjustmentFactors *= this.calculateCustomerHistoryAdjustment(customerHistory);
            }

            // Ajuste por condiciones de mercado
            const marketConditions = await this.getMarketConditions();
            adjustmentFactors *= this.calculateMarketAdjustment(marketConditions);

            // Calcular score final
            const finalScore = Math.round(baseScore * adjustmentFactors);

            // Determinar resultado
            const result = this.determineApprovalStatus(finalScore);

            return {
                score: finalScore,
                status: result.status,
                maxLoanAmount: result.maxLoanAmount,
                interestRate: result.interestRate,
                recommendations: result.recommendations
            };
        } catch (error) {
            console.error('Error calculating final score:', error);
            throw error;
        }
    }

    async getCustomerHistory(customerId) {
        // TODO: Implementar llamada a API para obtener historial del cliente
        return {
            previousLoans: 2,
            paymentHistory: 'good',
            relationshipYears: 3
        };
    }

    async getMarketConditions() {
        // TODO: Implementar llamada a API para obtener condiciones del mercado
        return {
            economicIndex: 0.8,
            riskLevel: 'medium',
            marketLiquidity: 'high'
        };
    }

    calculateCustomerHistoryAdjustment(history) {
        let adjustment = 1;
        
        if (history.paymentHistory === 'good') {
            adjustment += 0.1; // +10% por buen historial
        }
        
        if (history.relationshipYears > 2) {
            adjustment += 0.05; // +5% por lealtad
        }

        return adjustment;
    }

    calculateMarketAdjustment(conditions) {
        let adjustment = 1;
        
        // Ajuste por índice económico
        adjustment *= conditions.economicIndex;
        
        // Ajuste por nivel de riesgo del mercado
        switch(conditions.riskLevel) {
            case 'low':
                adjustment *= 1.1;
                break;
            case 'medium':
                adjustment *= 1;
                break;
            case 'high':
                adjustment *= 0.9;
                break;
        }

        return adjustment;
    }

    determineApprovalStatus(finalScore) {
        if (finalScore >= 800) {
            return {
                status: 'APPROVED_PREMIUM',
                maxLoanAmount: 50000,
                interestRate: 0.08,
                recommendations: ['Eligible for premium loan products', 'Preferred interest rates available']
            };
        } else if (finalScore >= 700) {
            return {
                status: 'APPROVED',
                maxLoanAmount: 25000,
                interestRate: 0.12,
                recommendations: ['Standard loan products available', 'Consider additional collateral for higher amounts']
            };
        } else if (finalScore >= 600) {
            return {
                status: 'APPROVED_WITH_CONDITIONS',
                maxLoanAmount: 10000,
                interestRate: 0.15,
                recommendations: ['Limited loan amount', 'Higher interest rate applies', 'Additional guarantor recommended']
            };
        } else {
            return {
                status: 'REJECTED',
                maxLoanAmount: 0,
                interestRate: 0,
                recommendations: [
                    'Application does not meet minimum requirements',
                    'Recommend improving credit score',
                    'Can reapply after 3 months'
                ]
            };
        }
    }
}

// Exportar el servicio
window.LoanScoringService = LoanScoringService;
