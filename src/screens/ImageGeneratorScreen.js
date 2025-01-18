import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ImageGenerator from '../components/ImageGenerator';

const ImageGeneratorScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageGenerator />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default ImageGeneratorScreen;
