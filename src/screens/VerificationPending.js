import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VerificationPending = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Pending</Text>
      <Text style={styles.message}>
        Your details have been submitted for verification. An admin will review your profile shortly.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
});

export default VerificationPending;
