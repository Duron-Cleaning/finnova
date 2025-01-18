import React, { useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const LyroChatbot = () => {
  useEffect(() => {
    // Inicializar Lyro cuando el componente se monte
    const script = document.createElement('script');
    script.src = 'https://lyro.ai/js/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpiar cuando el componente se desmonte
      document.body.removeChild(script);
    };
  }, []);

  // El div que contendrá el widget de Lyro
  return (
    <View style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1000 }}>
      <div id="lyro-widget"></div>
    </View>
  );
};

export default LyroChatbot;
