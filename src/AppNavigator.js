import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DisclaimerScreen from './screens/DisclaimerScreen';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import TechnicianDashboard from './screens/TechnicianDashboard';
import AvailabilityScreen from './screens/Availability';
import BookingScreen from './screens/Booking';
import PaymentScreen from './screens/PaymentScreen';
import WalletScreen from './screens/Wallet';
import CustomerDetails from './screens/CustomerDetails';
import VerificationPending from './screens/VerificationPending';
import WorkerEmergencyContact from './screens/WorkerEmergencyContact';
import AdminDashboard from './screens/AdminDashboard';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Disclaimer">
        <Stack.Screen name="Disclaimer" component={DisclaimerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TechnicianDashboard" component={TechnicianDashboard} />
        <Stack.Screen name="Availability" component={AvailabilityScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
        <Stack.Screen name="VerificationPending" component={VerificationPending} />
        <Stack.Screen name="WorkerEmergencyContact" component={WorkerEmergencyContact} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
