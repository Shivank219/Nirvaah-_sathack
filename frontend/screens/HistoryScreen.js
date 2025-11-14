import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import mockData from '../assets/mock_data.json';

const backgroundImage = require('../assets/placeholder_background.jpg');

const HistoryScreen = () => {
  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardIcon}>
        {item.primarySymptom === 'Skin Rash' ? 
          <MaterialCommunityIcons name="image-outline" size={30} color="#337ab7" /> :
          <MaterialCommunityIcons name="format-text" size={30} color="#337ab7" />
        }
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.primarySymptom}</Text>
        <Text style={styles.cardSubtitle}>{item.outcome}</Text>
      </View>
      <View style={styles.cardDateContainer}>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Consultation History</Text>
          <FlatList
            data={mockData.consultation_history}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' },
  container: { flex: 1 },
  header: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', padding: 20 },
  listContainer: { paddingHorizontal: 15 },
  card: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 10, padding: 15, marginBottom: 15, alignItems: 'center' },
  cardIcon: { marginRight: 15 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 2 },
  cardDateContainer: { alignItems: 'flex-end' },
  cardDate: { fontSize: 12, color: '#888' },
});

export default HistoryScreen;