import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DisclaimerScreen = ({ navigation }) => {
  const handleAccept = () => {
    // Navigate to the main app screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disclaimer</Text>
      <Text style={styles.text}>
        This is not a company or organization. This is only a platform for interacting with your local technician and customer.
      </Text>
      <Text style={styles.text}>
        We or this platform will have nothing to do with any incident and we will not be responsible.
      </Text>
      <Text style={styles.text}>
        If both parties are in agreement, you may use any service from this app.
      </Text>
      <Button title="I Agree" onPress={handleAccept} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default DisclaimerScreen;
