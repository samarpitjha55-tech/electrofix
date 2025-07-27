import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Notification = ({ message, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  message: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Notification;
