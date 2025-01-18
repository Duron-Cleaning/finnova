import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [locationChecked, setLocationChecked] = useState(false);

  useEffect(() => {
    checkAndRequestLocation();
  }, []);

  const checkAndRequestLocation = async () => {
    try {
      const hasCheckedLocation = await AsyncStorage.getItem('hasCheckedLocation');
      if (!hasCheckedLocation && !locationChecked) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            await AsyncStorage.setItem('hasCheckedLocation', 'true');
            setLocationChecked(true);
          },
          (error) => {
            Alert.alert(
              'Error de ubicación',
              'No se pudo obtener tu ubicación. Por favor, verifica los permisos de ubicación.',
              [{ text: 'OK' }]
            );
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    } catch (error) {
      console.error('Error checking location:', error);
    }
  };

  const quickAccess = [
    {
      id: 1,
      title: 'Simula tu Crédito',
      icon: 'calculate',
      route: 'CreditSimulator',
    },
    {
      id: 2,
      title: 'Completa tu Solicitud',
      icon: 'description',
      route: 'CreditRequest',
    },
    {
      id: 3,
      title: 'Paga tu Cuota',
      icon: 'payments',
      route: 'Payment',
    },
    {
      id: 4,
      title: 'Generador de Imágenes',
      icon: 'image',
      route: 'ImageGenerator',
    },
    {
      id: 5,
      title: 'Notificaciones',
      icon: 'notifications',
      route: 'NotificationCenter',
    },
  ];

  const benefits = [
    {
      id: 1,
      title: 'Rápido',
      description: 'Aprobación en 24 horas',
      icon: 'speed',
    },
    {
      id: 2,
      title: 'Transparente',
      description: 'Sin costos ocultos',
      icon: 'visibility',
    },
    {
      id: 3,
      title: 'Seguro',
      description: 'Tecnología de punta',
      icon: 'security',
    },
  ];

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header Image */}
      <Image
        source={require('../assets/header-image.png')}
        style={styles.headerImage}
      />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>
        Bienvenido a Finnova, tu futuro financiero a un clic.
      </Text>

      {/* Quick Access Buttons */}
      <View style={styles.quickAccessContainer}>
        {quickAccess.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.quickAccessButton}
            onPress={() => navigation.navigate(item.route)}
          >
            <Icon name={item.icon} size={24} color="#fff" />
            <Text style={styles.quickAccessText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsContainer}>
        {benefits.map((benefit) => (
          <View key={benefit.id} style={styles.benefitItem}>
            <Icon name={benefit.icon} size={24} color="#6A0DAD" />
            <View style={styles.benefitText}>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDescription}>{benefit.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Footer Links */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Legal')}>
          <Text style={styles.footerLink}>Términos y condiciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Legal')}>
          <Text style={styles.footerLink}>Política de privacidad</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Legal')}>
          <Text style={styles.footerLink}>Todo contra el fraude</Text>
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
    backgroundColor: '#F5F5F5',
  },
  headerImage: {
    width: 345,
    height: 345,
    alignSelf: 'center',
    marginTop: 30,
  },
  welcomeText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  quickAccessContainer: {
    flexDirection: 'column',
    padding: 16,
    gap: 12,
  },
  quickAccessButton: {
    backgroundColor: '#6A0DAD',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  quickAccessText: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  benefitsContainer: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginTop: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  benefitText: {
    marginLeft: 12,
  },
  benefitTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  benefitDescription: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  footerLink: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#4B0082',
    textDecorationLine: 'underline',
    marginVertical: 8,
  },
});

export default HomeScreen;
