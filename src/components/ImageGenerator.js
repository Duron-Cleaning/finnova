import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import dalleService from '../services/dalleService';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Por favor ingresa una descripción');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const url = await dalleService.generateImage(prompt);
      setImageUrl(url);
    } catch (err) {
      setError('Error al generar la imagen. Por favor intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const presetPrompts = [
    'Logo moderno para startup tecnológica',
    'Gráfico de crecimiento empresarial',
    'Equipo diverso trabajando en oficina moderna',
    'Interfaz de usuario futurista',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generador de Imágenes para Pitch Deck</Text>
      
      <View style={styles.presetContainer}>
        <Text style={styles.subtitle}>Sugerencias:</Text>
        <View style={styles.presetButtonsContainer}>
          {presetPrompts.map((presetPrompt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.presetButton}
              onPress={() => setPrompt(presetPrompt)}
            >
              <Text style={styles.presetButtonText}>{presetPrompt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Describe la imagen que deseas generar..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={generateImage}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Generar Imagen</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {imageUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  presetContainer: {
    marginBottom: 20,
  },
  presetButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  presetButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  presetButtonText: {
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
});

export default ImageGenerator;
