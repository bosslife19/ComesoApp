import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome, Fontisto } from '@expo/vector-icons';
  import { router } from 'expo-router';

const Headers = ()=> {

  const goBacks = () =>{
    router.push("/(tabs)/home")
  }

  const notification = () =>{
    router.push("/(routes)/notifications")
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.profileContainer}>
        <TouchableOpacity onPress={()=>router.push('/(routes)/profile/profile')}>
        {/* <Image 
            source={require('../../assets/images/profile.png')} 
            style={styles.profileImage}
          /> */}
          <FontAwesome name="user-circle" size={40} color="black" />
          {/* Red notification dot for profile */}
          {/* <View style={styles.notificationDot} /> */}

        </TouchableOpacity>         
        </View>
 
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Healthcare Provider</Text>
        </View>
        
        <TouchableOpacity onPress={()=>notification()}>
        <View style={styles.bellContainer}>
          <Fontisto name="bell" size={24} color="black" />
          {/* Red notification dot for bell */}
          {/* <View style={styles.notificationDot} /> */}
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 27,
    paddingHorizontal:23,
     
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
    fontSize: 22,
    fontWeight: '600',
    lineHeight:27.72
  },
  bellContainer: {
    padding:10,
    borderRadius:"50%",
    backgroundColor:"#A4A9AE40",
    position: 'relative', // To position the notification dot relative to the bell icon
  },
  notificationDot: {
    position: 'absolute',
    top: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5, // Circular dot
    backgroundColor: '#E73726',
  },
});


export default Headers;