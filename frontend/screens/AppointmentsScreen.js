import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import mockData from '../assets/mock_data.json';

const backgroundImage = require('../assets/placeholder_background.jpg');

const AppointmentsScreen = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const filteredAppointments = useMemo(() => {
    return mockData.appointments.filter(appt => appt.status === activeTab);
  }, [activeTab]);

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name="calendar-month" size={24} color="#337ab7" />
        <Text style={styles.cardDate}>{item.date} at {item.time}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.doctorName}>{item.doctor}</Text>
        <Text style={styles.locationText}>{item.location}</Text>
        {item.notes && <Text style={styles.notesText}>Notes: {item.notes}</Text>}
      </View>
    </View>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Your Appointments</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity 
              style={[styles.toggleButton, activeTab === 'upcoming' && styles.activeButton]}
              onPress={() => setActiveTab('upcoming')}
            >
              <Text style={[styles.toggleText, activeTab === 'upcoming' && styles.activeText]}>Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.toggleButton, activeTab === 'previous' && styles.activeButton]}
              onPress={() => setActiveTab('previous')}
            >
              <Text style={[styles.toggleText, activeTab === 'previous' && styles.activeText]}>Previous</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredAppointments}
            renderItem={renderAppointmentItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<Text style={styles.emptyText}>No {activeTab} appointments.</Text>}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)' },
  container: { flex: 1 },
  header: { fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', paddingVertical: 20 },
  toggleContainer: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10, marginHorizontal: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  toggleButton: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8 },
  toggleText: { color: '#ccc', fontSize: 16, fontWeight: '600' },
  activeButton: { backgroundColor: 'white' },
  activeText: { color: '#007bff' },
  listContainer: { paddingHorizontal: 20 },
  card: { backgroundColor: 'white', borderRadius: 10, marginBottom: 15, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e9f5ff', padding: 10, borderBottomWidth: 1, borderBottomColor: '#d1e7fd' },
  cardDate: { fontSize: 16, fontWeight: 'bold', color: '#0369a1', marginLeft: 10 },
  cardBody: { padding: 15 },
  doctorName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  locationText: { fontSize: 14, color: '#666', marginTop: 5 },
  notesText: { fontSize: 14, color: '#444', marginTop: 10, fontStyle: 'italic', backgroundColor: '#f8f9fa', padding: 10, borderRadius: 5 },
  emptyText: { color: 'white', textAlign: 'center', marginTop: 50, fontSize: 16 },
});

export default AppointmentsScreen;