// PaymentScreen.js - INR + UPI only (no cash)
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const PaymentScreen = ({ route }) => {
  const { bookingDetails } = route.params;
  const navigation = useNavigation();

  const handleUPIPayment = async () => {
    const payment = {
      amountINR: bookingDetails.amount,
      bookingId: bookingDetails.id,
      paidTo: bookingDetails.technicianId,
      status: 'success',
      timestamp: new Date(),
    };
    await addDoc(collection(db, 'payments'), payment);
    navigation.navigate('Confirmation', { payment });
  };

  return (
    <View>
      <Text>Service: {bookingDetails.service}</Text>
      <Text>Amount: ₹{bookingDetails.amount}</Text>
      <Button title="Pay with UPI" onPress={handleUPIPayment} />
    </View>
  );
};

export default PaymentScreen;
