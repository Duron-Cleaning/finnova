class CreditScoring {
    calculateScore(userData) {
        // Pesos de cada factor
        const weights = {
            ingresoMensual: 0.25,
            historialCrediticio: 0.20,
            tiempoTrabajo: 0.15,
            deudaActual: 0.15,
            edad: 0.10,
            ubicacion: 0.10,
            genero: 0.05
        };

        let score = 0;

        // Ingreso mensual (0-250 puntos)
        score += this.calculateIncomeScore(userData.ingresoMensual) * weights.ingresoMensual;

        // Historial crediticio (0-200 puntos)
        score += this.calculateCreditHistoryScore(userData.historialCrediticio) * weights.historialCrediticio;

        // Tiempo de trabajo (0-150 puntos)
        score += this.calculateEmploymentTimeScore(userData.tiempoTrabajo) * weights.tiempoTrabajo;

        // Deuda actual (0-150 puntos)
        score += this.calculateDebtScore(userData.deudaActual, userData.ingresoMensual) * weights.deudaActual;

        // Edad (0-100 puntos)
        score += this.calculateAgeScore(userData.edad) * weights.edad;

        // Ubicación (0-100 puntos)
        score += this.calculateLocationScore(userData.ubicacion) * weights.ubicacion;

        // Género (0-50 puntos, bonus para mujeres para promover inclusión financiera)
        score += this.calculateGenderScore(userData.genero) * weights.genero;

        return Math.round(score);
    }

    calculateIncomeScore(income) {
        if (income >= 20000) return 1000;
        if (income >= 15000) return 800;
        if (income >= 10000) return 600;
        if (income >= 5000) return 400;
        return 200;
    }

    calculateCreditHistoryScore(history) {
        const { pagosAtrasados, creditosActivos } = history;
        let score = 1000;
        
        // Reducir por pagos atrasados
        score -= pagosAtrasados * 200;
        
        // Reducir por cantidad de créditos activos
        if (creditosActivos > 3) score -= 200;
        else if (creditosActivos > 2) score -= 100;
        
        return Math.max(0, score);
    }

    calculateEmploymentTimeScore(years) {
        if (years >= 5) return 1000;
        if (years >= 3) return 800;
        if (years >= 1) return 600;
        if (years >= 0.5) return 400;
        return 200;
    }

    calculateDebtScore(currentDebt, income) {
        const debtRatio = currentDebt / income;
        if (debtRatio <= 0.2) return 1000;
        if (debtRatio <= 0.4) return 800;
        if (debtRatio <= 0.6) return 600;
        if (debtRatio <= 0.8) return 400;
        return 200;
    }

    calculateAgeScore(age) {
        if (age >= 35 && age <= 55) return 1000;
        if (age >= 25 && age < 35) return 800;
        if (age > 55 && age <= 65) return 600;
        if (age >= 18 && age < 25) return 400;
        return 200;
    }

    calculateLocationScore(location) {
        switch(location.riesgo.toLowerCase()) {
            case 'bajo': return 1000;
            case 'medio': return 600;
            case 'alto': return 200;
            default: return 0;
        }
    }

    calculateGenderScore(gender) {
        return gender.toLowerCase() === 'femenino' ? 1000 : 800;
    }

    getLoanRecommendation(score) {
        if (score >= 800) {
            return {
                rango: 'Excelente',
                montoMaximo: 7000,
                tasaInteres: 25,
                plazoMaximo: 24
            };
        } else if (score >= 700) {
            return {
                rango: 'Bueno',
                montoMaximo: 5000,
                tasaInteres: 30,
                plazoMaximo: 18
            };
        } else if (score >= 600) {
            return {
                rango: 'Regular',
                montoMaximo: 3000,
                tasaInteres: 35,
                plazoMaximo: 12
            };
        } else if (score >= 500) {
            return {
                rango: 'Bajo',
                montoMaximo: 1500,
                tasaInteres: 40,
                plazoMaximo: 6
            };
        } else {
            return {
                rango: 'Malo',
                montoMaximo: 700,
                tasaInteres: 45,
                plazoMaximo: 3
            };
        }
    }
}
