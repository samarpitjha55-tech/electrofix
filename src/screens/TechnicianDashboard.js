// TechnicianDashboard.js - Check eligibility for new work
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../firebase/config';

const TechnicianDashboard = () => {
  const [canAcceptNew, setCanAcceptNew] = useState(false);

  useEffect(() => {
    const checkEligibility = async () => {
      const q = query(collection(db, "bookings"), where("assignedTo", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const active = querySnapshot.docs.some(doc => {
        const d = doc.data();
        return d.status !== "completed";
      });
      setCanAcceptNew(!active);
    };
    checkEligibility();
  }, []);

  return (
    <View>
      <Text>Technician Dashboard</Text>
      <Text>Status: {canAcceptNew ? "Available for new jobs" : "Complete current work first"}</Text>
      <Button title="Refresh" onPress={() => setCanAcceptNew(prev => !prev)} />
    </View>
  );
};

export default TechnicianDashboard;
