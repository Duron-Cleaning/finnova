import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';

const CreditSimulatorScreen = () => {
  const [monto, setMonto] = useState('');
  const [plazo, setPlazo] = useState('');
  const [cuotaMensual, setCuotaMensual] = useState(0);

  useEffect(() => {
    if (monto && plazo) {
      // Simulación simple con tasa de interés del 12% anual
      const tasaAnual = 0.12;
      const tasaMensual = tasaAnual / 12;
      const montoNum = parseFloat(monto);
      const plazoNum = parseInt(plazo);
      
      const cuota = (montoNum * tasaMensual * Math.pow(1 + tasaMensual, plazoNum)) / 
                    (Math.pow(1 + tasaMensual, plazoNum) - 1);
      
      setCuotaMensual(Math.round(cuota * 100) / 100);
    } else {
      setCuotaMensual(0);
    }
  }, [monto, plazo]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Simulador de Crédito</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monto del préstamo</Text>
          <TextInput
            style={styles.input}
            value={monto}
            onChangeText={setMonto}
            placeholder="Ingrese el monto"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Plazo (meses)</Text>
          <TextInput
            style={styles.input}
            value={plazo}
            onChangeText={setPlazo}
            placeholder="Ingrese el plazo en meses"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Cuota mensual estimada:</Text>
          <Text style={styles.resultValue}>
            ${cuotaMensual.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          * Esta simulación es aproximada y puede variar según tu perfil crediticio y las condiciones del mercado.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 380,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  resultLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f4511e',
    textAlign: 'center',
  },
  disclaimer: {
    marginTop: 16,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default CreditSimulatorScreen;
