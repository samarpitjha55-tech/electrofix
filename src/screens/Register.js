import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import CustomButton from '../components/CustomButton';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [agree, setAgree] = useState(false);

  const handleRegister = () => {
    if (!agree) {
      Alert.alert('Agreement Required', 'You must agree to the terms and conditions to register.');
      return;
    }
    // Handle registration logic here
    console.log('Registering:', { name, email, password, role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.roleSelector}>
        <Text style={styles.roleLabel}>I am a:</Text>
        <CustomButton
          title="Customer"
          onPress={() => setRole('customer')}
          style={[styles.roleButton, role === 'customer' && styles.selectedRole]}
        />
        <CustomButton
          title="Electrician"
          onPress={() => setRole('electrician')}
          style={[styles.roleButton, role === 'electrician' && styles.selectedRole]}
        />
      </View>
      <View style={styles.noticeContainer}>
        <Text style={styles.noticeTitle}>Important Notice</Text>
        <Text style={styles.noticeText}>
          This is not a company or organization. This is only a platform to interact with your local technician and customer. We or this platform will have nothing to do with any incident and we will not be responsible. If both parties are in agreement, then you may use any service from this app.
        </Text>
      </View>
      <CheckBox
        title="I agree to the terms and conditions"
        checked={agree}
        onPress={() => setAgree(!agree)}
        containerStyle={styles.checkbox}
      />
      <CustomButton title="Register" onPress={handleRegister} disabled={!agree} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  roleSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  roleLabel: {
    marginRight: 10,
  },
  roleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedRole: {
    backgroundColor: 'lightblue',
  },
  noticeContainer: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noticeText: {
    fontSize: 14,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
});

export default Register;
