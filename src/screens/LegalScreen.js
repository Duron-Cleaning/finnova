import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LegalScreen = ({ navigation }) => {
  const legalSections = [
    {
      id: 1,
      title: 'Términos y Condiciones',
      icon: 'description',
      content: 'Información detallada sobre los términos de uso de nuestros servicios.',
    },
    {
      id: 2,
      title: 'Política de Privacidad',
      icon: 'security',
      content: 'Cómo protegemos y manejamos tu información personal.',
    },
    {
      id: 3,
      title: 'Todo contra el fraude',
      icon: 'shield',
      content: 'Medidas de seguridad y recomendaciones para prevenir el fraude.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Legal</Text>

        {legalSections.map((section) => (
          <TouchableOpacity key={section.id} style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Icon name={section.icon} size={24} color="#f4511e" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <Text style={styles.sectionContent}>{section.content}</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        ))}

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Información Importante</Text>
          <Text style={styles.infoText}>
            Finnova está comprometida con la transparencia y la seguridad de nuestros usuarios.
            Todos nuestros términos y políticas están diseñados para proteger tus derechos y
            garantizar un servicio financiero confiable.
          </Text>
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>¿Necesitas ayuda legal?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Icon name="email" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contactar Asesoría Legal</Text>
          </TouchableOpacity>
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
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactContainer: {
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default LegalScreen;
