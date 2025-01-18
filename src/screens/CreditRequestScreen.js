import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';

const CreditRequestScreen = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    monto: '',
    plazo: '',
  });

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar la solicitud
    console.log('Formulario enviado:', formData);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Solicita tu Crédito</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={formData.nombre}
            onChangeText={(text) => setFormData({...formData, nombre: text})}
            placeholder="Ingresa tu nombre"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Apellidos</Text>
          <TextInput
            style={styles.input}
            value={formData.apellidos}
            onChangeText={(text) => setFormData({...formData, apellidos: text})}
            placeholder="Ingresa tus apellidos"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            placeholder="Ingresa tu email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={formData.telefono}
            onChangeText={(text) => setFormData({...formData, telefono: text})}
            placeholder="Ingresa tu teléfono"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monto solicitado</Text>
          <TextInput
            style={styles.input}
            value={formData.monto}
            onChangeText={(text) => setFormData({...formData, monto: text})}
            placeholder="Ingresa el monto"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Plazo (meses)</Text>
          <TextInput
            style={styles.input}
            value={formData.plazo}
            onChangeText={(text) => setFormData({...formData, plazo: text})}
            placeholder="Ingresa el plazo"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar solicitud</Text>
        </TouchableOpacity>
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
  formContainer: {
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
  submitButton: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreditRequestScreen;
