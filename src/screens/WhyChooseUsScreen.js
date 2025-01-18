import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const WhyChooseUsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/why-choose-us.png')}
        style={styles.headerImage}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>¿Por qué elegirnos?</Text>
        
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTitle}>Experiencia y Confianza</Text>
          <Text style={styles.reasonText}>
            Más de 20 años brindando soluciones financieras confiables a nuestros clientes.
          </Text>
        </View>

        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTitle}>Proceso Simple y Rápido</Text>
          <Text style={styles.reasonText}>
            Solicita tu crédito en minutos y recibe una respuesta en menos de 24 horas.
          </Text>
        </View>

        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTitle}>Tasas Competitivas</Text>
          <Text style={styles.reasonText}>
            Ofrecemos las mejores tasas del mercado, adaptadas a tu perfil.
          </Text>
        </View>

        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTitle}>Atención Personalizada</Text>
          <Text style={styles.reasonText}>
            Nuestro equipo de asesores está disponible para ayudarte en cada paso.
          </Text>
        </View>

        <View style={styles.reasonContainer}>
          <Text style={styles.reasonTitle}>Tecnología de Punta</Text>
          <Text style={styles.reasonText}>
            Gestiona tu crédito desde nuestra app móvil de manera fácil y segura.
          </Text>
        </View>
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
  headerImage: {
    width: 345,
    height: 345,
    alignSelf: 'center',
    marginTop: 30,
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
  reasonContainer: {
    marginBottom: 24,
  },
  reasonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4511e',
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default WhyChooseUsScreen;
