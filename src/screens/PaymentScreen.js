import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentScreen = () => {
  const paymentMethods = [
    {
      id: 1,
      title: 'Tarjeta de Crédito/Débito',
      icon: 'credit-card',
      description: 'Paga de forma segura con tu tarjeta',
    },
    {
      id: 2,
      title: 'Transferencia Bancaria',
      icon: 'account-balance',
      description: 'Transfiere desde tu cuenta bancaria',
    },
    {
      id: 3,
      title: 'Pago en Efectivo',
      icon: 'local-atm',
      description: 'Paga en establecimientos autorizados',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Paga tu Cuota</Text>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Próximo pago:</Text>
          <Text style={styles.balanceAmount}>$3,500.00</Text>
          <Text style={styles.dueDate}>Fecha límite: 28 de Enero, 2025</Text>
        </View>

        <Text style={styles.sectionTitle}>Métodos de pago</Text>
        
        {paymentMethods.map((method) => (
          <TouchableOpacity key={method.id} style={styles.paymentMethod}>
            <Icon name={method.icon} size={32} color="#f4511e" />
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>{method.title}</Text>
              <Text style={styles.methodDescription}>{method.description}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        ))}

        <Text style={styles.note}>
          * Los pagos pueden tardar hasta 24 horas en verse reflejados en tu cuenta.
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
  balanceContainer: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f4511e',
    marginVertical: 8,
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  methodInfo: {
    flex: 1,
    marginLeft: 16,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  note: {
    marginTop: 16,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default PaymentScreen;
