import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Notification from '../components/Notification';

// Mock data for demonstration
const users = [
  { id: '1', name: 'John Doe', type: 'Customer', status: 'Verified' },
  { id: '2', name: 'Jane Smith', type: 'Worker', status: 'Pending' },
  { id: '3', name: 'Peter Jones', type: 'Customer', status: 'Pending' },
];

const AdminDashboard = ({ navigation }) => {
  const [showNotification, setShowNotification] = useState(true);

  const handleNotificationPress = () => {
    setShowNotification(false);
    // Navigate to the user's profile or verification screen
  };

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>{item.name} ({item.type})</Text>
      <Text style={{ color: item.status === 'Verified' ? 'green' : 'orange' }}>
        {item.status}
      </Text>
      <TouchableOpacity onPress={() => alert(`Viewing details for ${item.name}`)}>
        <Text style={styles.viewText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {showNotification && (
        <Notification
          message="New profile needs review: Jane Smith"
          onPress={handleNotificationPress}
        />
      )}
      <Text style={styles.title}>Admin Dashboard</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  viewText: {
    color: 'blue',
  },
});

export default AdminDashboard;
