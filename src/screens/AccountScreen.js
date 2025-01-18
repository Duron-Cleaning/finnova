import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AccountScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Perfil del usuario */}
      <View style={styles.profileSection}>
        <Icon name="account-circle" size={80} color="#f4511e" />
        <Text style={styles.userName}>Usuario</Text>
        <Text style={styles.userEmail}>usuario@example.com</Text>
      </View>

      {/* Menú de opciones */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="person" size={24} color="#f4511e" />
          <Text style={styles.menuText}>Perfil del usuario</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="account-balance" size={24} color="#f4511e" />
          <Text style={styles.menuText}>Mis préstamos</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="description" size={24} color="#f4511e" />
          <Text style={styles.menuText}>Documentos</Text>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="settings" size={24} color="#f4511e" />
          <Text style={styles.menuText}>Configuración</Text>
          <Icon name="chevron-right" size={24} color="#666" />
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
  profileSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
});

export default AccountScreen;
