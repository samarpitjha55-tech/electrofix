import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';

const CustomerDetails = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const handleSubmit = () => {
    if (!fullName || !address || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all mandatory fields.');
      return;
    }
    // Logic to save the details will be added here
    navigation.navigate('VerificationPending');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Real Name (as per Aadhaar)"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhaar Number (Optional)"
        value={aadhaar}
        onChangeText={setAadhaar}
        keyboardType="numeric"
      />
      <CustomButton title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default CustomerDetails;
