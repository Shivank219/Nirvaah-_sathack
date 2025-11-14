import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal, Linking, Dimensions, ImageBackground } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { Accelerometer } from 'expo-sensors';

const backgroundImage = require('../assets/home_background.jpg');
const { width } = Dimensions.get('window');
const gridItemSize = width * 0.4;

const HomeScreen = ({ navigation }) => {
  const netInfo = useNetInfo();
  const isOnline = netInfo.isConnected;
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (modalVisible && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      handleProceed();
    }
    return () => clearInterval(timer);
  }, [modalVisible, countdown]);

  const openEmergencyModal = () => {
    setCountdown(10);
    setModalVisible(true);
  };
  const handleCancel = () => setModalVisible(false);
  const handleProceed = () => {
    setModalVisible(false);
    Linking.openURL('tel:112');
  };
  
  useEffect(() => {
    let subscription;
    const SHAKE_THRESHOLD = 3.0;
    Accelerometer.isAvailableAsync().then(result => {
      if (result) {
        subscription = Accelerometer.addListener(data => {
          const { x, y, z } = data;
          if (Math.sqrt(x*x + y*y + z*z) > SHAKE_THRESHOLD && !modalVisible) {
            openEmergencyModal();
          }
        });
      }
    });
    return () => subscription && subscription.remove();
  }, [modalVisible]);

  return (
    <View style={styles.rootContainer}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.overlay}>
          <SafeAreaView style={styles.contentContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Feather name="menu" size={30} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>NIRVAAH</Text>
              <MaterialCommunityIcons 
                name={isOnline ? "wifi" : "wifi-off"} 
                size={30} 
                color={isOnline ? "#5cb85c" : "#d9534f"} 
              />
            </View>
            <View style={styles.grid}>
              <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('DiagnosisOptions')}><MaterialCommunityIcons name="clipboard-pulse-outline" size={gridItemSize * 0.35} color="#337ab7" /><Text style={styles.gridText}>Diagnosis</Text></TouchableOpacity>
              <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('History')}><MaterialCommunityIcons name="history" size={gridItemSize * 0.35} color="#5bc0de" /><Text style={styles.gridText}>Previous Consultations</Text></TouchableOpacity>
              <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Appointments')}><MaterialCommunityIcons name="calendar-check-outline" size={gridItemSize * 0.35} color="#5cb85c" /><Text style={styles.gridText}>Appointments</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.gridItem, styles.emergencyItem]} onPress={openEmergencyModal}><MaterialCommunityIcons name="alert-octagon" size={gridItemSize * 0.35} color="white" /><Text style={[styles.gridText, styles.emergencyText]}>Emergency</Text></TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={handleCancel}>
        <View style={styles.modalContainer}><View style={styles.modalContent}><Text style={styles.modalTitle}>EMERGENCY</Text><Text style={styles.modalCountdown}>{countdown}</Text><Text style={styles.modalInfo}>Contacting nearest emergency services...</Text><TouchableOpacity style={[styles.modalButton, styles.proceedButton]} onPress={handleProceed}><Text style={styles.modalButtonText}>Proceed Now</Text></TouchableOpacity><TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancel}><Text style={styles.modalButtonText}>Cancel</Text></TouchableOpacity></View></View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: { flex: 1 },
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  contentContainer: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingTop: 40, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  grid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignContent: 'center', padding: 10 },
  gridItem: { width: gridItemSize, height: gridItemSize, backgroundColor: 'rgba(255,255,255,0.95)', margin: 10, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  gridText: { marginTop: 10, fontSize: gridItemSize * 0.1, fontWeight: '600', textAlign: 'center', paddingHorizontal: 5, color: '#333' },
  emergencyItem: { backgroundColor: '#d9534f' },
  emergencyText: { color: 'white' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
  modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 28, fontWeight: 'bold', color: '#d9534f', marginBottom: 15 },
  modalCountdown: { fontSize: 72, fontWeight: 'bold', marginVertical: 10 },
  modalInfo: { fontSize: 16, marginBottom: 25, textAlign: 'center' },
  modalButton: { width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  proceedButton: { backgroundColor: '#5cb85c' },
  cancelButton: { backgroundColor: '#888' },
  modalButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;