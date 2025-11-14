// In screens/ResultScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import mockData from '../assets/mock_data.json'; // Import our fake database

const ResultScreen = ({ route }) => {
  // For now, we are not passing any symptoms, so we'll hardcode the logic.
  // In the next phase, we'll get 'userSymptoms' from route.params.
  const userSymptoms = "I have a fever and my nose is runny"; // A fake user input

  // --- FAKE AI LOGIC ---
  // This is where the real AI model would run. We will just simulate it.
  let diagnosis = "Common Cold"; // Default diagnosis
  if (userSymptoms.toLowerCase().includes("stomach") || userSymptoms.toLowerCase().includes("vomit")) {
    diagnosis = "Gastritis";
  } else if (userSymptoms.toLowerCase().includes("rash") || userSymptoms.toLowerCase().includes("itchy")) {
    diagnosis = "Skin Allergy";
  }

  // Look up the correct data from our JSON file based on the fake diagnosis
  const firstAidInfo = mockData.first_aid[diagnosis];
  const doctorsList = mockData.doctors;
  // --- END OF FAKE AI ---

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.header}>Diagnosis Result</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Potential Condition:</Text>
          <Text style={styles.diagnosisText}>{diagnosis}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recommended First-Aid:</Text>
          <Text style={styles.infoText}>{firstAidInfo}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nearby Verified Doctors:</Text>
          {doctorsList.map(doctor => (
            <Text key={doctor.id} style={styles.doctorText}>• {doctor.name} ({doctor.specialty})</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: 'white', borderRadius: 10, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#eee' },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#333' },
  diagnosisText: { fontSize: 20, fontWeight: 'bold', color: '#c9302c' },
  infoText: { fontSize: 16, lineHeight: 24, color: '#555' },
  doctorText: { fontSize: 16, marginBottom: 5 }
});

export default ResultScreen;