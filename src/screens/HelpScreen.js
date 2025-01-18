import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpScreen = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: '¿Cómo solicito un crédito?',
      answer: 'Puedes solicitar un crédito desde la sección "Solicita tu Crédito" en la app. Completa el formulario con tus datos y recibirás una respuesta en 24 horas.',
    },
    {
      id: 2,
      question: '¿Qué documentos necesito?',
      answer: 'Necesitarás tu identificación oficial, comprobante de domicilio reciente y comprobante de ingresos de los últimos 3 meses.',
    },
    {
      id: 3,
      question: '¿Cómo pago mi crédito?',
      answer: 'Puedes pagar tu crédito a través de la app utilizando tarjeta de crédito/débito, transferencia bancaria o en establecimientos autorizados.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Centro de Ayuda</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          {faqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Icon
                  name={expandedFaq === faq.id ? 'expand-less' : 'expand-more'}
                  size={24}
                  color="#666"
                />
              </View>
              {expandedFaq === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asistencia al Cliente</Text>
          <TouchableOpacity style={styles.contactOption}>
            <Icon name="phone" size={24} color="#f4511e" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Llámanos</Text>
              <Text style={styles.contactDetail}>Lun-Vie 9:00-18:00</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactOption}>
            <Icon name="mail" size={24} color="#f4511e" />
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Envíanos un correo</Text>
              <Text style={styles.contactDetail}>Respuesta en 24 horas</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guías y Tutoriales</Text>
          <TouchableOpacity style={styles.guideItem}>
            <Icon name="play-circle-filled" size={24} color="#f4511e" />
            <Text style={styles.guideTitle}>Cómo solicitar un crédito</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guideItem}>
            <Icon name="play-circle-filled" size={24} color="#f4511e" />
            <Text style={styles.guideTitle}>Proceso de pago</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  faqItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  faqAnswer: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
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
  contactInfo: {
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contactDetail: {
    fontSize: 14,
    color: '#666',
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  guideTitle: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
});

export default HelpScreen;
