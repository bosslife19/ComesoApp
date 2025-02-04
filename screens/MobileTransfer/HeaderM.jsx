import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome,  MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HeaderM() {
  const notification = () =>{
    router.push("/(routes)/profile/profile")
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <TouchableOpacity onPress={()=> router.back()} style={styles.bellContainer}>
      <MaterialIcons name="arrow-back-ios" size={14} color="#A4A9AE" />           
       </TouchableOpacity>
 
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Send Voucher</Text>
        </View>
        <TouchableOpacity onPress={()=> notification()} style={styles.bellContainer}>
        <FontAwesome name="user-circle" size={24} color="black" />
          {/* Red notification dot for bell */}
          {/* <View style={styles.notificationDot} /> */}
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 22,
    paddingHorizontal:6,
     
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative', // To position the notification dot relative to the image
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  greetingContainer: {
    flex: 1, // To push bell icon to the right side
    alignItems: 'center',
  },
  greetingText: {
     fontFamily: 'Sora',
    fontSize: 22,
    fontWeight: '700',
    lineHeight:27.72,
    color:"#23303B"
  },
  bellContainer: {
    padding:15,
    borderRadius:"50%",
    backgroundColor:"#A4A9AE40",
    position: 'relative', // To position the notification dot relative to the bell icon
  },
  notificationDot: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 7,
    height: 7,
    borderRadius: 5, // Circular dot
    backgroundColor: '#E73726',
  },
});
