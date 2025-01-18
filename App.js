import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LyroChatbot from './src/components/LyroChatbot';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import CreditRequestScreen from './src/screens/CreditRequestScreen';
import CreditSimulatorScreen from './src/screens/CreditSimulatorScreen';
import WhyChooseUsScreen from './src/screens/WhyChooseUsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import HelpScreen from './src/screens/HelpScreen';
import LegalScreen from './src/screens/LegalScreen';
import ImageGeneratorScreen from './src/screens/ImageGeneratorScreen';
import NotificationCenterScreen from './src/screens/NotificationCenterScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
          <Stack.Screen name="Account" component={AccountScreen} options={{ title: 'Mi Cuenta' }} />
          <Stack.Screen name="CreditRequest" component={CreditRequestScreen} options={{ title: 'Solicita tu Crédito' }} />
          <Stack.Screen name="CreditSimulator" component={CreditSimulatorScreen} options={{ title: 'Simula tu Crédito' }} />
          <Stack.Screen name="WhyChooseUs" component={WhyChooseUsScreen} options={{ title: '¿Por qué elegirnos?' }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Paga tu Cuota' }} />
          <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Ayuda' }} />
          <Stack.Screen name="Legal" component={LegalScreen} options={{ title: 'Legal' }} />
          <Stack.Screen 
            name="ImageGenerator" 
            component={ImageGeneratorScreen} 
            options={{ title: 'Generador de Imágenes' }} 
          />
          <Stack.Screen 
            name="NotificationCenter" 
            component={NotificationCenterScreen} 
            options={{ 
              title: 'Notificaciones',
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 16 }}>
                  <Icon name="notifications-none" size={24} color="#fff" />
                </TouchableOpacity>
              ),
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
      <LyroChatbot />
    </>
  );
};

export default App;
