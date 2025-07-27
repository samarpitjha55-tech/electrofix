import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';

const WorkerEmergencyContact = ({ navigation }) => {
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    if (!emergencyContactName || !relationship || !address || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    // Logic to save the details will be added here
    Alert.alert('Success', 'Emergency contact details saved.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact Name"
        value={emergencyContactName}
        onChangeText={setEmergencyContactName}
      />
      <TextInput
        style={styles.input}
        placeholder="Relationship"
        value={relationship}
        onChangeText={setRelationship}
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
      <CustomButton title="Save" onPress={handleSubmit} />
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

export default WorkerEmergencyContact;
