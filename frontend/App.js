import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// SCREENS
import LanguageScreen from './screens/LanguageScreen'; // This screen will now be unused, which is fine
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DiagnosisOptionsScreen from './screens/DiagnosisOptionsScreen';
import ChatScreen from './screens/ChatScreen';
import HistoryScreen from './screens/HistoryScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';

// COMPONENTS
import CustomDrawerContent from './components/DrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainAppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DiagnosisOptions" component={DiagnosisOptionsScreen} options={{ title: 'Start Diagnosis', headerShown: true }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'AI Diagnosis Chat', headerShown: true }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Consultation History', headerShown: true }} />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} options={{ title: 'Your Appointments', headerShown: true }} />
    </Stack.Navigator>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="MainApp" component={MainAppStack} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* --- THE FIX IS HERE --- */}
      <Stack.Navigator initialRouteName="Login"> 
        {/* We now start directly on the Login screen */}

        <Stack.Screen name="Language" component={LanguageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AppDrawer" component={AppDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}