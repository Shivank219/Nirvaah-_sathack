import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native';

const backgroundImage = require('../assets/language_background.jpg');

const LanguageScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>NIRVAAH</Text>
          <Text style={styles.subtitle}>Your Offline Health Lifeline</Text>
          <ActivityIndicator size="large" color="white" style={{ marginTop: 20 }}/>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 48, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 18, color: '#f0f0f0', marginTop: 10 },
});

export default LanguageScreen;