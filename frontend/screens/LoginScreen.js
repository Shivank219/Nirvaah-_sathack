import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ImageBackground } from 'react-native';

const backgroundImage = require('../assets/background.jpg');

const LoginScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Text style={styles.title}>NIRVAAH</Text>
          <Text style={styles.subtitle}>Your Offline Health Lifeline</Text>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Full Name" style={styles.input} placeholderTextColor="#ccc" />
            <TextInput placeholder="Age" style={styles.input} placeholderTextColor="#ccc" keyboardType="numeric" />
            <TextInput placeholder="Aadhaar Number" style={styles.input} placeholderTextColor="#ccc" keyboardType="numeric" maxLength={12} />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.replace('AppDrawer')}>
            <Text style={styles.buttonText}>Verify & Enter</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 52, fontWeight: 'bold', color: 'white', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 },
  subtitle: { fontSize: 18, color: '#f0f0f0', marginBottom: 40, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 },
  inputContainer: { width: '100%', marginBottom: 30 },
  input: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 15, paddingVertical: 15, borderRadius: 10, marginBottom: 15, fontSize: 16, color: 'white', borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
  button: { backgroundColor: '#5cb85c', paddingVertical: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});

export default LoginScreen;