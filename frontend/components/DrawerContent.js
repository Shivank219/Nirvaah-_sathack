// In DrawerContent.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  // For the hackathon, this data is hardcoded.
  const userData = {
    name: 'Asha Kumari',
    sex: 'Female',
    address: 'Village Rampur, Bihar',
    aadhaar: 'XXXX XXXX 1234',
    nirvaahId: 'NIRVAAH-USER-001',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Feather name="user" size={60} color="#333" />
        <Text style={styles.profileName}>{userData.name}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>Aadhaar:</Text>
        <Text style={styles.infoValue}>{userData.aadhaar}</Text>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoValue}>{userData.address}</Text>
        <Text style={styles.infoLabel}>NIRVAAH ID:</Text>
        <Text style={styles.infoValue}>{userData.nirvaahId}</Text>
      </View>
      {/* You can add navigation links here if needed */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileContainer: { alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  profileName: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  infoSection: { padding: 20 },
  infoLabel: { fontSize: 14, color: '#888', marginTop: 15 },
  infoValue: { fontSize: 16, fontWeight: '500' },
});

export default CustomDrawerContent;