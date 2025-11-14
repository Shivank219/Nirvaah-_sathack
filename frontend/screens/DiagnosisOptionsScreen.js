import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const backgroundImage = require('../assets/options_background.jpg');

const DiagnosisOptionsScreen = ({ navigation }) => {
  const handleImageFlow = () => {
    Alert.alert("Upload Symptom Image", "Please choose a source for your image.",
      [{ text: "Use Camera", onPress: () => takePhoto() }, { text: "Choose from Gallery", onPress: () => pickImage() }, { text: "Cancel", style: "cancel" }]
    );
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Sorry, we need camera access to take a photo.");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!result.canceled) {
      navigation.navigate('Chat', { imageUri: result.assets[0].uri });
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Sorry, we need gallery access to choose an image.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!result.canceled) {
      navigation.navigate('Chat', { imageUri: result.assets[0].uri });
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Start Your Diagnosis</Text>
          <Text style={styles.subHeader}>How would you like to provide your symptoms?</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Chat')}>
              <MaterialCommunityIcons name="format-text-variant" size={40} color="white" />
              <Text style={styles.buttonText}>Describe with Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={handleImageFlow}>
              <MaterialCommunityIcons name="camera-outline" size={40} color="white" />
              <Text style={styles.buttonText}>Use Camera / Upload Image</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 10 },
  subHeader: { fontSize: 18, color: '#f0f0f0', textAlign: 'center', marginBottom: 50 },
  optionsContainer: { width: '100%', alignItems: 'center' },
  optionButton: { width: '90%', backgroundColor: 'rgba(0, 123, 255, 0.8)', flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 20 },
});

export default DiagnosisOptionsScreen;